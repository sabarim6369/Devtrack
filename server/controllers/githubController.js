const axios = require('axios');
const User = require('../models/User');

const getGithubHeaders = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github.v3+json'
});

exports.getDashboardData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+accessToken');
        if (!user || !user.accessToken) {
            return res.status(401).json({ message: 'User not connected to GitHub' });
        }

        // IF using mock token, return mock data immediately
        if (user.accessToken === 'mock_access_token') {
            const mockData = {
                topRepos: [
                    { name: 'dev-track-ai', stars: 15, forks: 3, issues: 2, lang: 'JavaScript', url: '#' },
                    { name: 'portfolio-website', stars: 8, forks: 1, issues: 0, lang: 'React', url: '#' },
                    { name: 'api-gateway', stars: 12, forks: 2, issues: 1, lang: 'Node.js', url: '#' },
                    { name: 'ml-pipeline', stars: 20, forks: 5, issues: 3, lang: 'Python', url: '#' },
                    { name: 'blog-cms', stars: 6, forks: 0, issues: 1, lang: 'TypeScript', url: '#' }
                ],
                stats: {
                    totalPRs: 24,
                    openPRs: 3,
                    mergedPRs: 21,
                    totalCommits: 156,
                    totalRepos: 12
                },
                recentActivity: [
                    { type: 'PushEvent', repo: 'dev-track-ai', msg: 'feat: add authentication system', time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
                    { type: 'PullRequestEvent', repo: 'api-gateway', msg: 'Merged PR: Add rate limiting', time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
                    { type: 'IssuesEvent', repo: 'ml-pipeline', msg: 'Opened issue: Optimize training speed', time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
                    { type: 'PushEvent', repo: 'portfolio-website', msg: 'chore: update dependencies', time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
                    { type: 'CreateEvent', repo: 'blog-cms', msg: 'Created branch: feature/markdown-support', time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
                ]
            };
            return res.json(mockData);
        }

        // Real GitHub API calls for actual OAuth users
        const headers = getGithubHeaders(user.accessToken);
        const username = user.username;

        try {
            const [reposRes, prsRes, eventsRes] = await Promise.all([
                // 1. Top Repos (sorted by updated)
                axios.get(`https://api.github.com/user/repos?sort=updated&per_page=5&affiliation=owner`, { headers }),

                // 2. PR Stats (Search API) - use authenticated user's login
                axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers }),

                // 3. Recent Activity (Events) - use authenticated endpoint
                axios.get(`https://api.github.com/users/${username}/events/public?per_page=10`, { headers })
            ]);

            // Process Repos
            const topRepos = reposRes.data.map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                issues: repo.open_issues_count,
                lang: repo.language,
                url: repo.html_url
            }));

            // Process PRs
            const totalPRs = prsRes.data.total_count;

            // Process Events
            const recentActivity = eventsRes.data.map(event => ({
                type: event.type,
                repo: event.repo.name,
                msg: event.payload.commits?.[0]?.message || event.type,
                time: event.created_at
            }));

            res.json({
                topRepos,
                stats: {
                    totalPRs
                },
                recentActivity
            });
        } catch (apiError) {
            console.error('GitHub API Error:', apiError.response?.data || apiError.message);
            
            // If GitHub API fails, return friendly error with mock data fallback
            res.json({
                topRepos: [],
                stats: {
                    totalPRs: 0
                },
                recentActivity: [],
                warning: 'Unable to fetch GitHub data. Please reconnect your GitHub account.'
            });
        }

    } catch (error) {
        console.error('GitHub Data Fetch Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch GitHub data' });
    }
};

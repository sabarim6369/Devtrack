import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import {
  GitCommit,
  FolderGit2,
  Flame,
  Code2,
  ArrowUpRight,
  Star,
  GitFork,
  AlertCircle,
  GitPullRequest,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/github/dashboard', {
          withCredentials: true
        });
        setData(response.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load dashboard data. Please make sure you are connected to GitHub.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error}
      </div>
    );
  }

  const { topRepos, stats, recentActivity } = data;

  return (
    <div className="animate-fade-in pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2">Overview</h1>
        <p className="text-gray-400">Your GitHub activity at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: GitCommit, title: 'Total Commits', value: (stats?.totalPRs * 12) || 0, subtitle: 'Estimated', color: 'blue' }, // Mocking commits based on prs for now
          { icon: FolderGit2, title: 'Active Repos', value: topRepos?.length || 0, subtitle: 'Updated recently', color: 'purple' },
          { icon: Flame, title: 'Current Streak', value: '5 days', subtitle: 'Keep it up!', color: 'orange' },
          { icon: Code2, title: 'Top Language', value: topRepos?.[0]?.lang || 'N/A', subtitle: ' Most used', color: 'pink' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'text-blue-400 bg-blue-500/10',
            purple: 'text-purple-400 bg-purple-500/10',
            orange: 'text-orange-400 bg-orange-500/10',
            pink: 'text-pink-400 bg-pink-500/10'
          }[stat.color];

          return (
            <Card key={index} hover className="border-t border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-3xl font-bold text-white mb-1 font-outfit">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.subtitle}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart Area */}
        <Card className="lg:col-span-2 min-h-[300px] flex flex-col p-6 border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white font-outfit">Contribution Activity</h3>
          </div>
          <div className="flex-1 flex items-end justify-center space-x-3 px-2">
            {[40, 70, 45, 90, 60, 80, 50, 60, 75, 40, 30, 85].map((h, i) => (
              <div key={i} className="w-full relative group">
                <div
                  className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/50 rounded-t-lg hover:from-blue-600/40 hover:to-blue-500/70 transition-all duration-300"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pull Request Overview */}
        <Card className="p-6 border-white/5">
          <h3 className="text-lg font-bold text-white font-outfit mb-6">Pull Requests</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-white font-medium">Total PRs</span>
                  <span className="text-xs text-gray-500">All time</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white font-outfit">{stats?.totalPRs || 0}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Repositories */}
        <Card className="p-6 border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white font-outfit">Top Repositories</h3>
          </div>
          <div className="space-y-4">
            {topRepos?.map((repo, i) => (
              <a href={repo.url} target="_blank" rel="noopener noreferrer" key={i} className="block group p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">{repo.name}</h4>
                  <span className="text-xs text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">{repo.lang}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center hover:text-yellow-400 transition-colors"><Star className="w-3 h-3 mr-1" /> {repo.stars}</span>
                  <span className="flex items-center hover:text-purple-400 transition-colors"><GitFork className="w-3 h-3 mr-1" /> {repo.forks}</span>
                  <span className="flex items-center hover:text-green-400 transition-colors"><AlertCircle className="w-3 h-3 mr-1" /> {repo.issues}</span>
                </div>
              </a>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white font-outfit">Recent Activity</h3>
          </div>
          <div className="relative border-l border-white/10 ml-3 space-y-6">
            {recentActivity?.map((activity, i) => (
              <div key={i} className="relative pl-6">
                <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#0a0e27] ${activity.type === 'PushEvent' ? 'bg-blue-500' :
                    activity.type === 'PullRequestEvent' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">{activity.repo}</span>
                    <span className="text-[10px] text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{new Date(activity.time).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{activity.type} - {activity.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

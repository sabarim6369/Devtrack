import Card from '../components/Card';
import { GitCommit, Calendar } from 'lucide-react';

const Activity = () => {
  const activities = [
    { repo: 'my-portfolio', commits: 8, time: '2 hours ago', language: 'React' },
    { repo: 'api-server', commits: 3, time: '5 hours ago', language: 'Node.js' },
    { repo: 'ml-project', commits: 12, time: '1 day ago', language: 'Python' },
    { repo: 'mobile-app', commits: 5, time: '2 days ago', language: 'React Native' },
    { repo: 'data-viz', commits: 7, time: '3 days ago', language: 'TypeScript' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2">Activity</h1>
        <p className="text-gray-400">Your recent GitHub contributions</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <GitCommit className="w-5 h-5 text-blue-400" />
            <span>Recent Contributions</span>
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                  <span className="text-blue-400 font-mono text-lg font-bold">{activity.commits}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">{activity.repo}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                  {activity.language}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Activity;

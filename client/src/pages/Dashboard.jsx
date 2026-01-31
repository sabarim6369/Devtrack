import Card from '../components/Card';
import { GitCommit, FolderGit2, Flame, Code2, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2">Overview</h1>
        <p className="text-gray-400">Your GitHub activity at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: GitCommit, title: 'Total Commits', value: '1,247', subtitle: '+18% from last month', color: 'blue' },
          { icon: FolderGit2, title: 'Active Repos', value: '12', subtitle: '3 updated today', color: 'purple' },
          { icon: Flame, title: 'Current Streak', value: '23 days', subtitle: 'Personal best: 45 days', color: 'orange' },
          { icon: Code2, title: 'Top Language', value: 'JavaScript', subtitle: '42% of commits', color: 'pink' }
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
                <div className="flex items-center space-x-1 text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>2.5%</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-3xl font-bold text-white mb-1 font-outfit">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.subtitle}</div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section - Placeholder for now using Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-400 border-white/5">
          <h3 className="absolute top-6 left-6 text-lg font-medium text-white">Weekly Commit Activity</h3>
          <div className="w-full h-48 flex items-end justify-center space-x-2 px-6">
            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
              <div key={i} className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/50 rounded-t-lg hover:from-blue-600/40 hover:to-blue-500/70 transition-all duration-300" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </Card>

        <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-400 border-white/5">
          <h3 className="absolute top-6 left-6 text-lg font-medium text-white">Language Distribution</h3>
          <div className="relative w-48 h-48 rounded-full border-8 border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-purple-500/50 border-t-transparent rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-8 border-blue-500/50 border-t-transparent -rotate-45" style={{ transform: 'scale(0.85)' }}></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-outfit">JS</div>
              <div className="text-xs text-gray-500">42%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


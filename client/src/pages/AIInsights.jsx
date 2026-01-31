import Card from '../components/Card';
import { Brain, TrendingUp, AlertCircle, Send, Sparkles } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    { type: 'positive', icon: TrendingUp, title: 'Strong Productivity Trend', content: 'Your commit frequency has increased by 25% over the past two weeks. You\'re maintaining a consistent coding schedule with focus on your main projects.', timestamp: '2 hours ago' },
    { type: 'suggestion', icon: AlertCircle, title: 'Code Review Recommendation', content: 'You have 3 pull requests pending review for over 48 hours. Consider dedicating time to code reviews to improve team velocity.', timestamp: '5 hours ago' },
    { type: 'analysis', icon: Brain, title: 'Language Diversification', content: 'Your recent work shows balanced usage between JavaScript (45%), Python (30%), and TypeScript (25%). This diverse skill set is valuable for full-stack development.', timestamp: '1 day ago' }
  ];

  const weekSummary = { totalCommits: 47, topRepo: 'my-portfolio', linesAdded: 2840, linesRemoved: 1230, aiScore: 8.5 };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2 flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <span>AI Productivity Insights</span>
        </h1>
        <p className="text-gray-400">Intelligent analysis of your development patterns</p>
      </div>

      {/* Weekly Summary Card */}
      <Card className="p-8 mb-8 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent border-blue-500/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white font-outfit">Weekly AI Summary</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
          <div><p className="text-sm text-gray-400 mb-1">Total Commits</p><p className="text-3xl font-bold text-white font-outfit">{weekSummary.totalCommits}</p></div>
          <div><p className="text-sm text-gray-400 mb-1">Top Repository</p><p className="text-xl font-bold text-white font-outfit truncate">{weekSummary.topRepo}</p></div>
          <div><p className="text-sm text-gray-400 mb-1">Lines Added</p><p className="text-3xl font-bold text-green-400 font-outfit">+{weekSummary.linesAdded}</p></div>
          <div><p className="text-sm text-gray-400 mb-1">Lines Removed</p><p className="text-3xl font-bold text-red-400 font-outfit">-{weekSummary.linesRemoved}</p></div>
          <div><p className="text-sm text-gray-400 mb-1">AI Score</p><p className="text-3xl font-bold text-blue-400 font-outfit">{weekSummary.aiScore}<span className="text-lg text-gray-500">/10</span></p></div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-gray-300 leading-relaxed italic">
            "Excellent week! You maintained consistent development activity with well-balanced focus
            across multiple projects. Your code quality metrics remain high, and your collaboration
            through pull request reviews is improving team productivity."
          </p>
        </div>
      </Card>

      {/* AI Insights */}
      <div className="space-y-6 mb-24">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const config = {
            positive: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
            suggestion: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
            analysis: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
          }[insight.type];

          return (
            <Card key={index} className={`p-6 border ${config.border} hover:bg-white/[0.02]`}>
              <div className="flex items-start space-x-5">
                <div className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white font-outfit">{insight.title}</h3>
                    <span className="text-xs text-gray-500 font-medium bg-white/5 px-2 py-1 rounded-full">{insight.timestamp}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{insight.content}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-6 left-0 right-0 md:left-64 px-4 md:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <Card className="p-2 flex items-center space-x-2 bg-[#0a0e27]/90 backdrop-blur-xl border-blue-500/30 shadow-2xl">
            <input
              type="text"
              placeholder="Ask AI about your GitHub activity..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg text-white hover:opacity-90 transition-opacity">
              <Send className="w-5 h-5" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

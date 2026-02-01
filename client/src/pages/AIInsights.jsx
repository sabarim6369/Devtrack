import Card from '../components/Card';
import {
  Brain,
  TrendingUp,
  AlertCircle,
  Send,
  Sparkles,
  Clock,
  Zap,
  Target,
  Battery
} from 'lucide-react';

const AIInsights = () => {
  // Mock Data
  const burnoutLevel = 35; // 0-100
  const productivityScore = 92;

  return (
    <div className="animate-fade-in pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2 flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <span>AI Productivity Intelligence</span>
        </h1>
        <p className="text-gray-400">Deep dive analytics into your coding habits and performance</p>
      </div>

      {/* Top Bento Grid - High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Main Score Card */}
        <Card className="col-span-1 md:col-span-2 p-8 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold text-white font-outfit mb-1">Developer Vitality Score</h2>
              <p className="text-sm text-gray-400">Aggregated from code quality, speed, and consistency</p>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-bold">+12% vs last week</span>
            </div>
          </div>

          <div className="flex items-end space-x-4">
            <span className="text-6xl font-bold text-white font-outfit tracking-tight">{productivityScore}</span>
            <span className="text-xl text-gray-400 mb-2">/ 100</span>
          </div>

          <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${productivityScore}%` }}
            ></div>
          </div>
          <p className="mt-3 text-sm text-gray-300">
            You're in the <span className="text-purple-400 font-bold">Top 5%</span> of developers for consistency this month.
          </p>
        </Card>

        {/* Burnout Risk Meter */}
        <Card className="p-6 flex flex-col justify-between items-center relative overflow-hidden">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Battery className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold text-white font-outfit">Sustainablity</h3>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-bold ${burnoutLevel < 50 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {burnoutLevel < 50 ? 'Healthy' : 'Risk'}
            </span>
          </div>

          {/* Gauge Visualization using SVG */}
          <div className="relative w-40 h-20 overflow-hidden">
            <svg viewBox="0 0 100 50" className="w-full h-full transform transition-all duration-1000 ease-out">
              {/* Background Arc */}
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              {/* Active Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="url(#gradient-burnout)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="126"
                strokeDashoffset={126 - (126 * burnoutLevel) / 100}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient-burnout" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
              <span className="text-2xl font-bold text-white">{burnoutLevel}%</span>
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Load</span>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            Great balance! meaningful work without overexertion.
          </p>
        </Card>
      </div>

      {/* Deep Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Productivity Heatmap */}
        <Card className="col-span-1 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Deep Work Clock</h3>
          </div>
          <div className="relative aspect-square flex items-center justify-center">
            {/* Clock Face SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              {/* Hours Marker */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="50" y1="10" x2="50" y2="15"
                  transform={`rotate(${i * 30} 50 50)`}
                  stroke="#334155"
                  strokeWidth="2"
                />
              ))}
              {/* Productive Zones (Arcs) */}
              <path d="M 50 50 L 50 15 A 35 35 0 0 1 80.3 32.5 Z" fill="rgba(59, 130, 246, 0.2)" /> {/* 12-4 PM */}
              <path d="M 50 50 L 20 67.5 A 35 35 0 0 1 15 50 Z" fill="rgba(168, 85, 247, 0.2)" /> {/* 8-9 PM */}

              {/* Center */}
              <circle cx="50" cy="50" r="3" fill="white" />
              <text x="50" y="50" textAnchor="middle" dy="40" className="text-[6px] fill-gray-400 font-outfit">HOURS</text>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2 py-1 rounded backdrop-blur-md translate-y-[-40px] translate-x-[20px]">
                Peak: 2PM
              </span>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            You're most productive between <span className="text-white">1 PM - 4 PM</span>.
          </p>
        </Card>

        {/* Skill Radar */}
        <Card className="col-span-1 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Focus Balance</h3>
          </div>
          <div className="relative aspect-square flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 overflow-visible">
              {/* Grid */}
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#1e293b" strokeWidth="1" />
              <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* Data: 6 points hex */}
              {/* 
                  Top: Features (80%) -> 50, 14
                  TopRight: Reviews (40%) -> 74, 38
                  BottomRight: Refactor (60%) -> 74, 62
                  Bottom: Testing (30%) -> 50, 78
                  BottomLeft: Docs (20%) -> 26, 62
                  TopLeft: Bugfix (50%) -> 26, 38
               */}
              <polygon
                points="50,14 82,34 74,62 50,82 26,62 18,34"
                fill="rgba(168, 85, 247, 0.2)"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Labels */}
              <text x="50" y="5" textAnchor="middle" className="text-[6px] fill-gray-400">Features</text>
              <text x="95" y="25" textAnchor="middle" className="text-[6px] fill-gray-400">Review</text>
              <text x="95" y="75" textAnchor="middle" className="text-[6px] fill-gray-400">Refactor</text>
              <text x="50" y="98" textAnchor="middle" className="text-[6px] fill-gray-400">Testing</text>
              <text x="5" y="75" textAnchor="middle" className="text-[6px] fill-gray-400">Docs</text>
              <text x="5" y="25" textAnchor="middle" className="text-[6px] fill-gray-400">Bugs</text>
            </svg>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            Opportunity: Increase focus on <span className="text-white">Testing</span> coverage.
          </p>
        </Card>

        {/* Actionable Insights List */}
        <Card className="col-span-1 p-6 flex flex-col">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Recommendations</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { type: 'High Priority', msg: 'Review 3 PRs pending > 2 days', color: 'text-red-400' },
              { type: 'Optimization', msg: 'Schedule deep work session for 2 PM', color: 'text-blue-400' },
              { type: 'Health', msg: 'Take a break, 4h continuous session detected', color: 'text-green-400' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${item.color}`}>{item.type}</span>
                <p className="text-sm text-gray-300">{item.msg}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Velocity / Heatmap Strip */}
      <Card className="p-6 mb-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Cognitive Load Map</h3>
          </div>
          <div className="flex space-x-2 text-xs text-gray-500">
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500/20 mr-1"></div> Low</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> High</span>
          </div>
        </div>

        {/* Heatmap Grid (CSS Grid) */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="grid grid-cols-7 gap-2 h-32">
            {Array.from({ length: 28 }).map((_, i) => {
              // Pseudo-random intensity for demo
              const intensity = [10, 30, 60, 90, 40, 20, 10][i % 7] + (Math.random() * 20);
              const opacity = intensity / 100;
              return (
                <div
                  key={i}
                  className="rounded-md hover:scale-105 transition-transform duration-200 cursor-help relative group"
                  style={{ backgroundColor: `rgba(59, 130, 246, ${Math.max(0.1, opacity)})` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0a0e27] text-white text-[10px] px-2 py-1 rounded border border-white/10 whitespace-nowrap z-10 pointer-events-none">
                    {Math.round(intensity)}% Load
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Chat Input */}
      <div className="fixed bottom-6 left-0 right-0 md:left-64 px-4 md:px-8 pointer-events-none z-20">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <Card className="p-2 flex items-center space-x-2 bg-[#0a0e27]/90 backdrop-blur-xl border-blue-500/30 shadow-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <input
              type="text"
              placeholder="Ask AI: 'How can I improve my code review turnaround?'"
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3"
            />
            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

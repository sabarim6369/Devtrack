import { useState, useEffect } from 'react';
import { Brain, Sparkles, Battery, TrendingUp, Clock, Target, Zap, Send, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../components/Card';
import axios from 'axios';

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [mode, setMode] = useState('loading');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/ai/insights', {
        withCredentials: true
      });

      if (response.data.success) {
        setInsights(response.data.data);
        setMode(response.data.mode);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load AI insights');
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || chatLoading) return;

    const userMessage = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setChatLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/chat', 
        { message: userMessage },
        { withCredentials: true }
      );

      if (response.data.success) {
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          message: response.data.data.response,
          suggestions: response.data.data.suggestions 
        }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { 
        type: 'error', 
        message: 'Failed to get response. Please try again.' 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setChatMessage(suggestion);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-outfit">Analyzing your GitHub data...</p>
          <p className="text-gray-400 text-sm mt-2">Generating AI insights</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white text-center mb-2">Unable to Load Insights</h2>
          <p className="text-gray-400 text-center mb-4">{error}</p>
          <button
            onClick={fetchInsights}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  if (!insights) return null;

  const { vitalityScore, productivityScore, burnoutLevel, deepWorkClock, focusBalance, recommendations, cognitiveLoadPattern, insightsData } = insights;

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-outfit">
              AI Insights
            </h1>
            <p className="text-gray-400">
              {mode === 'mock' ? '🤖 Demo Mode - ' : '✨ AI-Powered - '}
              Personalized productivity analysis
            </p>
          </div>
          <button
            onClick={fetchInsights}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Vitality Score */}
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white font-outfit">Developer Vitality</h3>
            </div>
            <TrendingUp className={`w-5 h-5 ${
              vitalityScore.trend === 'up' ? 'text-green-400' : 
              vitalityScore.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
            }`} />
          </div>
          
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">
              {vitalityScore.score}
              <span className="text-2xl text-gray-400">/100</span>
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              vitalityScore.trend === 'up' ? 'bg-green-500/20 text-green-400' :
              vitalityScore.trend === 'down' ? 'bg-red-500/20 text-red-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {vitalityScore.trend === 'up' ? '↗ Trending Up' :
               vitalityScore.trend === 'down' ? '↘ Trending Down' :
               '→ Stable'}
            </div>
          </div>
          
          <p className="text-sm text-gray-300 text-center">{vitalityScore.explanation}</p>
        </Card>

        {/* Productivity Score */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Productivity Score</h3>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
              {productivityScore.score}
              <span className="text-2xl text-gray-400">/100</span>
            </div>
          </div>

          <div className="space-y-2">
            {productivityScore.factors?.slice(0, 3).map((factor, i) => (
              <div key={i} className="flex items-center text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                {factor}
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-400 mt-4">{productivityScore.explanation}</p>
        </Card>

        {/* Burnout Meter */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Battery className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Sustainability</h3>
          </div>

          {/* Gauge Visualization */}
          <div className="relative aspect-square flex items-center justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Background */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
              
              {/* Progress */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={
                  burnoutLevel.level > 70 ? '#ef4444' :
                  burnoutLevel.level > 40 ? '#f59e0b' :
                  '#10b981'
                }
                strokeWidth="8"
                strokeDasharray={`${(burnoutLevel.level / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{100 - burnoutLevel.level}%</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Energy</span>
            </div>
          </div>

          <div className={`text-center px-3 py-2 rounded-lg ${
            burnoutLevel.risk === 'high' ? 'bg-red-500/20 text-red-400' :
            burnoutLevel.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            <p className="text-xs font-semibold">
              {burnoutLevel.risk === 'high' ? '⚠️ High Risk' :
               burnoutLevel.risk === 'medium' ? '⚡ Moderate' :
               '✅ Healthy'}
            </p>
          </div>
          
          <p className="text-xs text-center text-gray-400 mt-3">{burnoutLevel.recommendation}</p>
        </Card>
      </div>

      {/* Deep Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Deep Work Clock */}
        <Card className="col-span-1 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Deep Work Clock</h3>
          </div>
          <div className="relative aspect-square flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              {/* Hours Markers */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="50" y1="10" x2="50" y2="15"
                  transform={`rotate(${i * 30} 50 50)`}
                  stroke="#334155"
                  strokeWidth="2"
                />
              ))}
              
              {/* Peak Hours Highlight */}
              {deepWorkClock?.peakHours?.map((hour, idx) => {
                const angle = (hour % 12) * 30 - 90;
                const startAngle = angle - 15;
                const endAngle = angle + 15;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const radius = 35;
                
                const x1 = 50 + radius * Math.cos(startRad);
                const y1 = 50 + radius * Math.sin(startRad);
                const x2 = 50 + radius * Math.cos(endRad);
                const y2 = 50 + radius * Math.sin(endRad);
                
                return (
                  <path
                    key={idx}
                    d={`M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                );
              })}

              <circle cx="50" cy="50" r="3" fill="white" />
              <text x="50" y="90" textAnchor="middle" className="text-[6px] fill-gray-400 font-outfit">PEAK HOURS</text>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2 py-1 rounded backdrop-blur-md">
                {deepWorkClock?.peakHours?.[0] || 14}:00
              </span>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">{deepWorkClock?.explanation}</p>
        </Card>

        {/* Focus Balance Radar */}
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

              {/* Data Polygon */}
              <polygon
                points={`
                  50,${50 - (focusBalance?.features || 0) * 0.4}
                  ${50 + (focusBalance?.reviews || 0) * 0.4},${50 - (focusBalance?.reviews || 0) * 0.2}
                  ${50 + (focusBalance?.refactor || 0) * 0.4},${50 + (focusBalance?.refactor || 0) * 0.2}
                  50,${50 + (focusBalance?.testing || 0) * 0.4}
                  ${50 - (focusBalance?.documentation || 0) * 0.4},${50 + (focusBalance?.documentation || 0) * 0.2}
                  ${50 - (focusBalance?.bugfixes || 0) * 0.4},${50 - (focusBalance?.bugfixes || 0) * 0.2}
                `}
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
            Focus on: <span className="text-white capitalize">{focusBalance?.recommendation || 'balanced approach'}</span>
          </p>
        </Card>

        {/* Recommendations */}
        <Card className="col-span-1 p-6 flex flex-col">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white font-outfit">Recommendations</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {recommendations?.map((item, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    item.priority === 'high' ? 'text-red-400' :
                    item.priority === 'medium' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {item.type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    item.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{item.message}</p>
                <p className="text-xs text-gray-500 italic">→ {item.impact}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cognitive Load Map */}
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

        {cognitiveLoadPattern?.alert && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {cognitiveLoadPattern.alert}
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="grid grid-cols-7 gap-2 h-32">
            {(cognitiveLoadPattern?.dailyPattern || [45, 60, 75, 80, 65, 30, 20]).map((intensity, i) => {
              const opacity = intensity / 100;
              return (
                <div
                  key={i}
                  className="rounded-md hover:scale-105 transition-transform duration-200 cursor-help relative group"
                  style={{ backgroundColor: `rgba(59, 130, 246, ${Math.max(0.1, opacity)})` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0a0e27] text-white text-[10px] px-2 py-1 rounded border border-white/10 whitespace-nowrap z-10 pointer-events-none">
                    {intensity}% Load
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights List */}
        {insights?.insights && insights.insights.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              Key Insights
            </h4>
            <div className="space-y-2">
              {insights.insights.map((insight, i) => (
                <p key={i} className="text-sm text-gray-300">
                  {insight}
                </p>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Chat Input */}
      <div className="fixed bottom-6 left-0 right-0 md:left-64 px-4 md:px-8 pointer-events-none z-20">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Chat History */}
          {chatHistory.length > 0 && (
            <Card className="mb-4 p-4 max-h-96 overflow-y-auto custom-scrollbar bg-[#0a0e27]/95 backdrop-blur-xl">
              <div className="space-y-3">
                {chatHistory.map((chat, i) => (
                  <div key={i} className={`${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                      chat.type === 'user' ? 'bg-blue-600 text-white' :
                      chat.type === 'error' ? 'bg-red-500/20 text-red-400' :
                      'bg-white/10 text-gray-200'
                    }`}>
                      {chat.message}
                    </div>
                    {chat.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-2 justify-start">
                        {chat.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(sug)}
                            className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="text-left">
                    <div className="inline-block px-4 py-2 rounded-lg bg-white/10">
                      <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Chat Input Form */}
          <form onSubmit={handleChat}>
            <Card className="p-2 flex items-center space-x-2 bg-[#0a0e27]/90 backdrop-blur-xl border-blue-500/30 shadow-2xl">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask AI: 'How can I improve my code review turnaround?'"
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3 outline-none"
                disabled={chatLoading}
              />
              <button 
                type="submit"
                disabled={chatLoading || !chatMessage.trim()}
                className="p-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

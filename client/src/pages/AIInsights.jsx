import { useState, useEffect, useRef } from 'react';
import { Brain, Sparkles, Battery, TrendingUp, Clock, Target, Zap, Send, AlertCircle, RefreshCw, 
         Code, GitBranch, GitCommit, Star, Users, BookOpen, MessageSquare, Lightbulb, 
         Activity, BarChart3, PieChart, Calendar, Award, TrendingDown, Maximize2, Minimize2,
         ChevronDown, ChevronUp, Github, FolderGit2, Hash, Eye, GitPullRequest, Info } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchInsights();
    fetchRepositories();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/github/repos', {
        withCredentials: true
      });
      if (response.data) {
        setRepos(response.data.slice(0, 20));
      }
    } catch (err) {
      console.error('Error fetching repos:', err);
    }
  };

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
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage, timestamp: new Date() }]);
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
          suggestions: response.data.data.suggestions,
          timestamp: new Date()
        }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { 
        type: 'error', 
        message: 'Failed to get response. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setChatMessage(suggestion);
    const textarea = document.querySelector('textarea, input[type="text"]');
    textarea?.focus();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const quickPrompts = [
    "Analyze my most productive repositories",
    "What languages should I focus on?",
    "How can I improve code quality?",
    "Show me collaboration patterns",
    "What are my peak productivity hours?",
    "Suggest areas for skill development",
    "Analyze my commit patterns",
    "Which repos need more attention?"
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Brain className="w-20 h-20 text-blue-500 animate-pulse mx-auto mb-6" />
            <Sparkles className="w-8 h-8 text-purple-400 absolute top-0 right-1/3 animate-ping" />
          </div>
          <p className="text-white text-2xl font-outfit font-bold mb-2">Analyzing Your GitHub Activity</p>
          <p className="text-gray-400 text-sm">Processing commits, repos, and patterns...</p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white text-center mb-2">Unable to Load Insights</h2>
          <p className="text-gray-400 text-center mb-6">{error}</p>
          <button
            onClick={fetchInsights}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-medium"
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
    <div className="min-h-screen p-4 md:p-8 pb-32 relative">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-3 font-outfit">
              AI-Powered Insights Dashboard
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-gray-400 flex items-center gap-2">
                {mode === 'mock' ? (
                  <><Brain className="w-4 h-4 text-yellow-400" /> Demo Mode - Sample Data</>
                ) : (
                  <><Sparkles className="w-4 h-4 text-blue-400 animate-pulse" /> Real-time AI Analysis</>
                )}
              </p>
              <span className="text-gray-600">•</span>
              <p className="text-gray-500 text-sm">{repos.length} repositories analyzed</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all flex items-center space-x-2 border border-white/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">AI Chat</span>
            </button>
            <button
              onClick={fetchInsights}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'insights', label: 'Deep Insights', icon: Brain },
          { id: 'activity', label: 'Activity Heatmap', icon: Calendar },
          { id: 'advanced', label: 'Advanced Analytics', icon: Award },
          { id: 'repos', label: 'Repositories', icon: FolderGit2 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            
            {/* Vitality Score */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white font-outfit">Developer Vitality</h3>
                </div>
                <TrendingUp className={`w-4 h-4 ${
                  vitalityScore.trend === 'up' ? 'text-green-400' : 
                  vitalityScore.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                }`} />
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {vitalityScore.score}
                  <span className="text-xl text-gray-400">/100</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  vitalityScore.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                  vitalityScore.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {vitalityScore.trend === 'up' ? '↗ Improving' :
                   vitalityScore.trend === 'down' ? '↘ Declining' :
                   '→ Stable'}
                </div>
              </div>
            </Card>

            {/* Productivity Score */}
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-outfit">Productivity</h3>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
                  {productivityScore.score}
                  <span className="text-xl text-gray-400">/100</span>
                </div>
                <p className="text-xs text-gray-400">{productivityScore.factors?.[0]}</p>
              </div>
            </Card>

            {/* Sustainability */}
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Battery className="w-5 h-5 text-green-400" />
                <h3 className="text-sm font-bold text-white font-outfit">Energy Level</h3>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {100 - burnoutLevel.level}%
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  burnoutLevel.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                  burnoutLevel.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {burnoutLevel.risk === 'high' ? '⚠️ High Risk' :
                   burnoutLevel.risk === 'medium' ? '⚡ Moderate' :
                   '✅ Healthy'}
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-yellow-400" />
                <h3 className="text-sm font-bold text-white font-outfit">Activity</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Repositories</span>
                  <span className="text-sm font-bold text-white">{repos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Peak Hour</span>
                  <span className="text-sm font-bold text-white">{deepWorkClock?.peakHours?.[0] || 14}:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Focus Area</span>
                  <span className="text-sm font-bold text-white capitalize">{focusBalance?.recommendation || 'Balanced'}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Deep Work Clock */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white font-outfit">Peak Hours</h3>
                </div>
                <Info className="w-4 h-4 text-gray-500" />
              </div>
              
              <div className="space-y-3">
                {deepWorkClock?.peakHours?.map((hour, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-400 font-mono">{hour}:00</div>
                    <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transition-all duration-500"
                        style={{ width: `${85 - idx * 10}%` }}
                      />
                    </div>
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">{deepWorkClock?.explanation}</p>
            </Card>

            {/* Focus Balance */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white font-outfit">Work Distribution</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Features', value: focusBalance?.features || 0, color: 'blue' },
                  { label: 'Code Review', value: focusBalance?.reviews || 0, color: 'purple' },
                  { label: 'Refactoring', value: focusBalance?.refactor || 0, color: 'pink' },
                  { label: 'Testing', value: focusBalance?.testing || 0, color: 'green' },
                  { label: 'Documentation', value: focusBalance?.documentation || 0, color: 'yellow' },
                  { label: 'Bug Fixes', value: focusBalance?.bugfixes || 0, color: 'red' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color === 'blue' ? '#3b82f6' :
                                         item.color === 'purple' ? '#a855f7' :
                                         item.color === 'pink' ? '#ec4899' :
                                         item.color === 'green' ? '#10b981' :
                                         item.color === 'yellow' ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white font-outfit">Quick Wins</h3>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {recommendations?.slice(0, 5).map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:bg-white/10 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        item.priority === 'high' ? 'text-red-400' :
                        item.priority === 'medium' ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {item.type}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        item.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm text-white mb-2 font-medium">{item.message}</p>
                    <p className="text-xs text-gray-400">💡 {item.impact}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Cognitive Load & Insights */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-pink-400" />
                  <h3 className="text-lg font-bold text-white font-outfit">Weekly Cognitive Load</h3>
                </div>
                <div className="flex space-x-3 text-xs">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500/20"></div>
                    <span className="text-gray-400">Low</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span className="text-gray-400">High</span>
                  </span>
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

              <div className="grid grid-cols-7 gap-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const intensity = cognitiveLoadPattern?.dailyPattern?.[i] || (45 + i * 10);
                  const height = `${Math.max(20, intensity)}%`;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="flex-1 w-full flex items-end min-h-[120px]">
                        <div
                          className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                          style={{ 
                            height,
                            backgroundColor: `rgba(59, 130, 246, ${Math.max(0.2, intensity / 100)})`
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                            {intensity}% load
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{day}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Deep Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Key Insights */}
          {insights?.insights && insights.insights.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white font-outfit">AI-Generated Insights</h2>
              </div>
              <div className="grid gap-4">
                {insights.insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                      {i + 1}
                    </div>
                    <p className="text-gray-200 leading-relaxed flex-1">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Productivity Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Current Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">{productivityScore.score}</span>
                    <span className="text-gray-500 mb-1">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-3">Contributing Factors</p>
                  <div className="space-y-2">
                    {productivityScore.factors?.map((factor, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></div>
                        <span className="text-gray-300 text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-sm italic">{productivityScore.explanation}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5 text-yellow-400" />
                Burnout Assessment
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Risk Level</p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    burnoutLevel.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                    burnoutLevel.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    <span className="text-2xl font-bold capitalize">{burnoutLevel.risk}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-3">Warning Signs</p>
                  <div className="space-y-2">
                    {burnoutLevel.indicators?.map((indicator, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <span className="text-gray-300 text-sm">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Recommendation:</strong> {burnoutLevel.recommendation}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* All Recommendations */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Complete Action Plan
            </h3>
            <div className="grid gap-4">
              {recommendations?.map((item, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          item.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {item.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                          item.priority === 'medium' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-green-500/10 text-green-400'
                        }`}>
                          Priority: {item.priority}
                        </span>
                      </div>
                      <p className="text-white font-medium mb-2">{item.message}</p>
                      <p className="text-sm text-gray-400">
                        <strong className="text-gray-300">Expected Impact:</strong> {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Activity Heatmap Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          {/* Contribution Heatmap */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-400" />
                  Contribution Activity
                </h2>
                <p className="text-gray-400 text-sm mt-1">Your coding activity over the past year</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{Math.floor(Math.random() * 500 + 200)}</p>
                <p className="text-xs text-gray-500">Total Contributions</p>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                {/* Month Labels */}
                <div className="flex gap-1 mb-2 ml-12">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                    <div key={idx} className="text-xs text-gray-500" style={{ width: '84px' }}>
                      {month}
                    </div>
                  ))}
                </div>
                
                {/* Heatmap */}
                <div className="flex gap-1">
                  {/* Day Labels */}
                  <div className="flex flex-col justify-around text-xs text-gray-500 mr-2">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  
                  {/* Grid */}
                  <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 1fr)', gridAutoColumns: '12px' }}>
                    {Array.from({ length: 365 }).map((_, i) => {
                      const intensity = Math.random();
                      const contributions = Math.floor(intensity * 15);
                      return (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-blue-400 group relative"
                          style={{
                            backgroundColor: 
                              intensity > 0.8 ? '#10b981' :
                              intensity > 0.6 ? '#34d399' :
                              intensity > 0.4 ? '#6ee7b7' :
                              intensity > 0.2 ? '#a7f3d0' :
                              intensity > 0.05 ? '#d1fae5' : '#1e293b'
                          }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                            {contributions} contributions
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0.05, 0.3, 0.5, 0.7, 0.9].map((intensity, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: 
                            intensity > 0.8 ? '#10b981' :
                            intensity > 0.6 ? '#34d399' :
                            intensity > 0.4 ? '#6ee7b7' :
                            intensity > 0.2 ? '#a7f3d0' : '#d1fae5'
                        }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <GitCommit className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                  <p className="text-3xl font-bold text-white">{Math.floor(Math.random() * 30 + 5)} days</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Keep it going! 🔥</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Longest Streak</p>
                  <p className="text-3xl font-bold text-white">{Math.floor(Math.random() * 60 + 30)} days</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Personal best 🏆</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Per Day</p>
                  <p className="text-3xl font-bold text-white">{Math.floor(Math.random() * 10 + 3)}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Contributions/day</p>
            </Card>
          </div>

          {/* Monthly Activity Breakdown */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Monthly Activity Breakdown
            </h3>
            <div className="grid grid-cols-12 gap-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                const value = Math.floor(Math.random() * 80 + 20);
                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="flex-1 flex items-end h-32 w-full">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{month}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Advanced Analytics Tab */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          {/* Language Evolution */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-white font-outfit mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-400" />
              Language Expertise Timeline
            </h2>
            <div className="space-y-4">
              {[
                { lang: 'JavaScript', level: 85, trend: 'up', color: 'yellow' },
                { lang: 'Python', level: 75, trend: 'up', color: 'blue' },
                { lang: 'TypeScript', level: 70, trend: 'stable', color: 'blue' },
                { lang: 'Java', level: 60, trend: 'down', color: 'orange' },
                { lang: 'Go', level: 45, trend: 'up', color: 'cyan' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{item.lang}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                        item.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.trend === 'up' ? '↗ Growing' : item.trend === 'down' ? '↘ Declining' : '→ Stable'}
                      </span>
                    </div>
                    <span className="text-white font-bold">{item.level}%</span>
                  </div>
                  <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Collaboration Network */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Collaboration Impact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(Math.random() * 50 + 10)}
                    </div>
                    <div>
                      <p className="text-white font-medium">Pull Requests</p>
                      <p className="text-xs text-gray-400">Opened & reviewed</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(Math.random() * 100 + 50)}
                    </div>
                    <div>
                      <p className="text-white font-medium">Code Reviews</p>
                      <p className="text-xs text-gray-400">Given to teammates</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
                      {Math.floor(Math.random() * 30 + 5)}
                    </div>
                    <div>
                      <p className="text-white font-medium">Collaborators</p>
                      <p className="text-xs text-gray-400">Active contributors</p>
                    </div>
                  </div>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-pink-400" />
                Code Quality Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Test Coverage', value: 78, color: 'green', icon: '✓' },
                  { label: 'Code Reusability', value: 85, color: 'blue', icon: '♻' },
                  { label: 'Documentation', value: 65, color: 'yellow', icon: '📚' },
                  { label: 'Bug Fix Rate', value: 92, color: 'purple', icon: '🐛' },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm flex items-center gap-2">
                        <span>{metric.icon}</span>
                        {metric.label}
                      </span>
                      <span className="text-white font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${metric.color}-500 rounded-full transition-all duration-500`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Project Health Dashboard */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Repository Health Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.slice(0, 6).map((repo, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm truncate">{repo.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{repo.language || 'Unknown'}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        idx % 3 === 0 ? 'text-green-400' :
                        idx % 3 === 1 ? 'text-yellow-400' : 'text-blue-400'
                      }`}>
                        {Math.floor(Math.random() * 30 + 70)}
                      </div>
                      <p className="text-xs text-gray-500">Health</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count || 0}</span>
                    <GitBranch className="w-3 h-3 ml-2" />
                    <span>{repo.forks_count || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Time Analysis */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Coding Time Patterns
            </h3>
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-gray-400 text-xs mb-3">{day}</p>
                  <div className="space-y-1">
                    {Array.from({ length: 24 }).map((_, hour) => {
                      const activity = Math.random();
                      return (
                        <div
                          key={hour}
                          className="h-1 rounded-full"
                          style={{
                            backgroundColor: activity > 0.7 ? '#3b82f6' :
                                           activity > 0.4 ? '#60a5fa' :
                                           activity > 0.2 ? '#93c5fd' : '#1e293b'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span>High Activity</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-300"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-gray-700"></div>
                <span>Low</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Repositories Tab */}
      {activeTab === 'repos' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-purple-400" />
                Your Repositories
              </h2>
              <span className="text-gray-400 text-sm">{repos.length} total</span>
            </div>

            {repos.length === 0 ? (
              <div className="text-center py-12">
                <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No repositories found</p>
                <p className="text-gray-500 text-sm mt-2">Connect your GitHub account to see your repos</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {repos.map((repo, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                    onClick={() => setSelectedRepo(selectedRepo === idx ? null : idx)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FolderGit2 className="w-5 h-5 text-blue-400" />
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                            {repo.name}
                          </h3>
                          {repo.private && (
                            <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Private</span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-gray-400 text-sm mb-3">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <Code className="w-4 h-4" />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {repo.stargazers_count || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-4 h-4" />
                            {repo.forks_count || 0} forks
                          </span>
                          {repo.open_issues_count > 0 && (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {repo.open_issues_count} issues
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors">
                        {selectedRepo === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {selectedRepo === idx && (
                      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Created</p>
                          <p className="text-sm text-white">{new Date(repo.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Updated</p>
                          <p className="text-sm text-white">{new Date(repo.updated_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Size</p>
                          <p className="text-sm text-white">{(repo.size / 1024).toFixed(2)} MB</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Watchers</p>
                          <p className="text-sm text-white flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {repo.watchers_count || 0}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Floating Chat Interface */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] z-50">
          <Card className="flex flex-col h-[600px] max-h-[80vh] bg-[#0a0e27]/95 backdrop-blur-xl border-blue-500/30 shadow-2xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Ask anything about your GitHub activity</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompts */}
            {chatHistory.length === 0 && (
              <div className="p-4 border-b border-white/10">
                <p className="text-xs text-gray-400 mb-3">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.slice(0, 4).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="text-xs px-3 py-2 bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-white rounded-lg transition-all border border-white/5 hover:border-blue-500/30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {chatHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Start a conversation with AI</p>
                  <p className="text-gray-600 text-xs mt-1">Ask about your repos, productivity, or get coding advice</p>
                </div>
              ) : (
                <>
                  {chatHistory.map((chat, i) => (
                    <div key={i} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${chat.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-3 rounded-2xl ${
                          chat.type === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                            : chat.type === 'error'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-white/10 text-gray-200'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{chat.message}</p>
                        </div>
                        {chat.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
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
                        <p className="text-[10px] text-gray-600 mt-1 px-2">
                          {chat.timestamp?.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChat} className="p-4 border-t border-white/10">
              <div className="flex items-end gap-2">
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleChat(e);
                    }
                  }}
                  placeholder="Ask about your GitHub activity..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-gray-500 px-4 py-3 rounded-xl outline-none resize-none transition-colors"
                  rows="2"
                  disabled={chatLoading}
                />
                <button 
                  type="submit"
                  disabled={chatLoading || !chatMessage.trim()}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIInsights;

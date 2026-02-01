import Card from '../components/Card';
import Button from '../components/Button';
import { Github, Moon, Sun, LogOut, CheckCircle2, User, Bell, Shield, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGithubConnection } from '../hooks/useGithubConnection';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, logout } = useAuth();
  const githubConnection = useGithubConnection();

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getMemberSince = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* GitHub Connection Status */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <Github className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Linked Accounts</h2>
          </div>

          <div className="space-y-4 mb-6">
            {githubConnection.loading ? (
              <div className="flex items-center justify-center p-8 bg-white/5 rounded-xl">
                <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
              </div>
            ) : githubConnection.connected ? (
              <>
                {/* Connected Account */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/30">
                  <div className="flex items-center space-x-4">
                    {githubConnection.avatarUrl ? (
                      <img
                        src={githubConnection.avatarUrl}
                        alt="GitHub Profile"
                        className="w-10 h-10 rounded-lg border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {(githubConnection.githubUsername || 'G')[0].toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{githubConnection.githubUsername}</span>
                        {githubConnection.isMockAccount ? (
                          <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Dev</span>
                        ) : (
                          <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Active</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        Synced {formatDate(githubConnection.lastSynced)}
                      </span>
                    </div>
                  </div>
                  {githubConnection.needsReconnect ? (
                    <a href="http://localhost:5000/api/auth/github">
                      <Button variant="primary" className="h-9 px-3 text-sm">
                        Reconnect
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      variant="secondary" 
                      className="h-9 px-3 text-sm border-red-500/30 hover:bg-red-500/10 hover:text-red-400 text-gray-400"
                      onClick={() => alert('Unlink functionality coming soon')}
                    >
                      Unlink
                    </Button>
                  )}
                </div>
                
                {githubConnection.needsReconnect && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-200">
                      Your GitHub connection has expired. Please reconnect to continue syncing your data.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Not Connected */
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">No GitHub account connected</p>
                <a href="http://localhost:5000/api/auth/github">
                  <Button variant="primary" className="justify-center" icon={Github}>
                    Connect GitHub Account
                  </Button>
                </a>
              </div>
            )}
          </div>

          {githubConnection.connected && (
            <a href="http://localhost:5000/api/auth/github">
              <Button variant="secondary" className="w-full justify-center border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-400 hover:text-blue-400" icon={RefreshCw}>
                Refresh Connection
              </Button>
            </a>
          )}

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start space-x-3 max-w-2xl">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">
              <strong>Read-only access:</strong> DevTrack AI only requests read permissions.
              We never modify your repositories or access private information.
            </p>
          </div>
        </Card>

        {/* Theme Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>

          <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/5 max-w-2xl">
            <div className="flex items-center space-x-4">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-purple-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-400" />
              )}
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-gray-400">
                  {isDarkMode ? 'active' : 'inactive'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-gray-600'
                }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-lg ${isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Account</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Email</p>
              <p className="text-white font-medium">{user?.email || 'Not set'}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Member since</p>
              <p className="text-white font-medium">{getMemberSince(user?.createdAt)}</p>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Sign out of your account on this device</p>
            <Button variant="danger" icon={LogOut} onClick={logout}>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

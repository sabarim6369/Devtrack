import Card from '../components/Card';
import Button from '../components/Button';
import { Github, Moon, Sun, LogOut, CheckCircle2, User, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
            {/* Active Account */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/30">
              <div className="flex items-center space-x-4">
                <img
                  src="https://github.com/github.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-lg border border-white/10"
                />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">sabarim6369</span>
                    <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Active</span>
                  </div>
                  <span className="text-xs text-gray-400">Synced 5m ago</span>
                </div>
              </div>
              <Button variant="secondary" className="h-9 px-3 text-sm border-red-500/30 hover:bg-red-500/10 hover:text-red-400 text-gray-400">
                Unlink
              </Button>
            </div>

            {/* Inactive Account Example */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-white/5 text-gray-500 font-bold">
                  JD
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">johndoe_dev</span>
                  <span className="text-xs text-gray-500">Last active 2d ago</span>
                </div>
              </div>
              <Button variant="ghost" className="h-9 px-3 text-sm text-blue-400 hover:text-blue-300">
                Switch
              </Button>
            </div>
          </div>

          <Button variant="secondary" className="w-full justify-center border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-400 hover:text-blue-400" icon={Github}>
            Connect Another Account
          </Button>

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
              <p className="text-white font-medium">developer@example.com</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Member since</p>
              <p className="text-white font-medium">January 2026</p>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Sign out of your account on this device</p>
            <Button variant="danger" icon={LogOut}>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

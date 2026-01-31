import { Link } from 'react-router-dom';
import { Code2, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">DevTrack AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/settings" 
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <User className="w-5 h-5 text-gray-300" />
              <span className="text-sm text-gray-300">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

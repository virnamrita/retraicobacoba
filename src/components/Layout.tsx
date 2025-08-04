import React from 'react';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, FileText, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [location] = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isJobSeeker = user?.role === 'jobseeker';
  const isRecruiter = user?.role === 'recruiter';

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-primary cursor-pointer">
              Retrai
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="btn-primary">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <>
                {isJobSeeker && (
                  <>
                    <Link href="/profile">
                      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location === '/profile' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
                      }`}>
                        <User size={18} />
                        <span>Profile</span>
                      </button>
                    </Link>
                    <Link href="/applications">
                      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location === '/applications' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
                      }`}>
                        <FileText size={18} />
                        <span>Applications</span>
                      </button>
                    </Link>
                    <Link href="/find-jobs">
                      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location === '/find-jobs' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
                      }`}>
                        <Search size={18} />
                        <span>Find Jobs</span>
                      </button>
                    </Link>
                    <Link href="/settings">
                      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location === '/settings' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
                      }`}>
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>
                    </Link>
                  </>
                )}

                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};
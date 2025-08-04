import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore, mockUsers } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { login } = useAuthStore();
  const [userType, setUserType] = useState<'recruiter' | 'jobseeker'>('jobseeker');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'recruiter') {
      login(mockUsers.recruiter);
      setLocation('/');
    } else {
      login(mockUsers.jobseeker);
      setLocation('/profile');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login to Retrai
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="jobseeker"
                  checked={userType === 'jobseeker'}
                  onChange={(e) => setUserType(e.target.value as 'jobseeker')}
                  className="mr-2"
                />
                Job Seeker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="recruiter"
                  checked={userType === 'recruiter'}
                  onChange={(e) => setUserType(e.target.value as 'recruiter')}
                  className="mr-2"
                />
                Recruiter
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              defaultValue={userType === 'recruiter' ? 'sarah@company.com' : 'john@email.com'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              defaultValue="password123"
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
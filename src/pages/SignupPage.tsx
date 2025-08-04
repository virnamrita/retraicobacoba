import React from 'react';
import { Link } from 'wouter';

export const SignupPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Join Retrai
        </h2>
        
        <div className="space-y-4">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">For Job Seekers</h3>
            <p className="text-gray-600 mb-4">Create your profile and find opportunities</p>
            <Link href="/login">
              <button className="btn-primary w-full">
                Sign up as Job Seeker
              </button>
            </Link>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">For Recruiters</h3>
            <p className="text-gray-600 mb-4">Find and hire the best talent</p>
            <Link href="/login">
              <button className="btn-outline w-full">
                Sign up as Recruiter
              </button>
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-primary hover:underline cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
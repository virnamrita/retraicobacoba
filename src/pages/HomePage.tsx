import React from 'react';
import { Link } from 'wouter';
import { useAuthStore } from '../store/authStore';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.role === 'recruiter') {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to Retrai</h1>
        <p className="text-gray-600 mb-8">Manage your job postings and candidates</p>
        <Link href="/job/1">
          <button className="btn-primary">
            View Marketing Specialist Applications
          </button>
        </Link>
      </div>
    );
  }

  if (isAuthenticated && user?.role === 'jobseeker') {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Continue building your profile and find your next opportunity</p>
        <div className="flex justify-center space-x-4">
          <Link href="/profile">
            <button className="btn-primary">
              View Profile
            </button>
          </Link>
          <Link href="/find-jobs">
            <button className="btn-outline">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Video Section */}
        <div className="mb-12">
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto mb-8">
            <img 
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Person smiling during video interview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-6">
                <div className="w-0 h-0 border-l-[20px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Create your live profile and grab your opportunities
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stand out from the crowd with video interviews and AI-powered profile matching. 
            Connect with top recruiters and land your dream job.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-6">
          <Link href="/signup">
            <button className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </button>
          </Link>
          <Link href="/login">
            <button className="btn-outline text-lg px-8 py-4">
              Sign In
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-primary rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Profiles</h3>
            <p className="text-gray-600">Showcase your personality with video interviews</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-accent rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
            <p className="text-gray-600">Get matched with relevant opportunities</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-primary rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Connect</h3>
            <p className="text-gray-600">Connect directly with hiring managers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
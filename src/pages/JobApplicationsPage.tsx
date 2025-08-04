import React from 'react';
import { useJobStore } from '../store/jobStore';
import { Link } from 'wouter';
import { MapPin, DollarSign } from 'lucide-react';

export const JobApplicationsPage: React.FC = () => {
  const { currentJob, updateApplicationStatus } = useJobStore();

  if (!currentJob) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">No job selected</h1>
      </div>
    );
  }

  const handleStatusUpdate = (applicationId: string, status: 'shortlisted' | 'rejected') => {
    updateApplicationStatus(applicationId, status);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Job Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {currentJob.title}
        </h1>
        <p className="text-gray-600">{currentJob.company}</p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Applications ({currentJob.applications.length})
        </h2>
        
        {currentJob.applications.map((application) => (
          <div
            key={application.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {application.jobSeeker.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      {application.jobSeeker.currentPosition} at {application.jobSeeker.currentCompany}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        <span>${application.jobSeeker.expectedSalary?.toLocaleString()}/month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Link href={`/candidate/${application.jobSeeker.id}`}>
                    <button className="btn-outline">
                      See complete profile
                    </button>
                  </Link>
                  
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'shortlisted')}
                        className="bg-accent text-black px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'rejected')}
                        className="btn-danger"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
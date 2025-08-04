import React from 'react';
import { useRoute } from 'wouter';
import { useJobStore } from '../store/jobStore';
import { VideoPlayer } from '../components/VideoPlayer';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';

export const CandidateProfilePage: React.FC = () => {
  const [match, params] = useRoute('/candidate/:id');
  const { currentJob, updateApplicationStatus } = useJobStore();
  
  if (!match || !params?.id || !currentJob) {
    return <div>Candidate not found</div>;
  }

  const application = currentJob.applications.find(
    app => app.jobSeeker.id === params.id
  );

  if (!application) {
    return <div>Candidate not found</div>;
  }

  const { jobSeeker } = application;

  const handleStatusUpdate = (status: 'shortlisted' | 'rejected') => {
    updateApplicationStatus(application.id, status);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {jobSeeker.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              {jobSeeker.currentPosition}
            </p>
            <p className="text-gray-500 mb-4">
              {jobSeeker.currentCompany}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              {jobSeeker.email && (
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>{jobSeeker.email}</span>
                </div>
              )}
              {jobSeeker.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>{jobSeeker.phone}</span>
                </div>
              )}
              {jobSeeker.domicile && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{jobSeeker.domicile}</span>
                </div>
              )}
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
        
        {application.status === 'pending' && (
          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleStatusUpdate('shortlisted')}
              className="bg-accent text-black px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Shortlist
            </button>
            <button
              onClick={() => handleStatusUpdate('rejected')}
              className="btn-danger"
            >
              Reject
            </button>
          </div>
        )}
      </div>

      {/* Video Interview */}
      {jobSeeker.videoUrl && (
        <div className="mb-6">
          <VideoPlayer 
            videoUrl={jobSeeker.videoUrl}
            title="Interview"
          />
        </div>
      )}

      {/* Experience Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Experience</h2>
        
        <div className="space-y-6">
          {jobSeeker.experiences.map((experience) => (
            <div key={experience.id} className="border-l-4 border-primary pl-6 pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {experience.jobTitle}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>{experience.startDate} - {experience.endDate}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 font-medium">
                {experience.company}
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
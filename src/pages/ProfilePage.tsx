import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { JobSeeker, Experience } from '../types';
import { Upload, Plus, Save, Video } from 'lucide-react';
import { useLocation } from 'wouter';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<Partial<JobSeeker>>(user as JobSeeker || {});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isProcessingCV, setIsProcessingCV] = useState(false);

  const handleInputChange = (field: keyof JobSeeker, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      setIsProcessingCV(true);
      
      // Simulate AI processing
      setTimeout(() => {
        // Mock AI-extracted experience
        const mockExperience: Experience[] = [
          {
            id: Date.now().toString(),
            jobTitle: 'Senior Software Developer',
            company: 'Tech Innovations Inc.',
            startDate: '2022-01',
            endDate: 'Present',
            description: 'Led development of scalable web applications using React and Node.js. Managed a team of 5 developers and improved system performance by 40%.'
          },
          {
            id: (Date.now() + 1).toString(),
            jobTitle: 'Software Developer',
            company: 'StartupXYZ',
            startDate: '2020-06',
            endDate: '2021-12',
            description: 'Developed mobile applications and maintained legacy systems. Collaborated with cross-functional teams to deliver high-quality software solutions.'
          }
        ];
        
        setFormData(prev => ({ ...prev, experiences: mockExperience }));
        setIsProcessingCV(false);
      }, 2000);
    }
  };

  const addNewExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    setFormData(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ) || []
    }));
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.filter(exp => exp.id !== id) || []
    }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    alert('Profile saved successfully!');
  };

  const handleStartInterview = () => {
    updateProfile(formData);
    setLocation('/interview');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domicile
            </label>
            <input
              type="text"
              value={formData.domicile || ''}
              onChange={(e) => handleInputChange('domicile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your location"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Monthly Salary ($)
            </label>
            <input
              type="number"
              value={formData.expectedSalary || ''}
              onChange={(e) => handleInputChange('expectedSalary', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter expected salary"
            />
          </div>
        </div>
      </div>

      {/* Interview Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Interview</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submit CV
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleCVUpload}
              className="hidden"
              id="cv-upload"
            />
            <label htmlFor="cv-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">
                {cvFile ? cvFile.name : 'Click to upload your CV (PDF only)'}
              </p>
            </label>
          </div>
          
          {isProcessingCV && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">🤖 AI is processing your CV and extracting experience...</p>
            </div>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
          <button
            onClick={addNewExperience}
            className="flex items-center space-x-2 btn-outline"
          >
            <Plus size={18} />
            <span>Add New Experience</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {formData.experiences?.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={experience.jobTitle}
                    onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter job title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Present"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
              
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove Experience
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSaveProfile}
          className="flex items-center space-x-2 btn-outline"
        >
          <Save size={18} />
          <span>Save Profile</span>
        </button>
        
        <button
          onClick={handleStartInterview}
          className="flex items-center space-x-2 bg-accent text-black px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          <Video size={18} />
          <span>Save Profile and Start Free Interview</span>
        </button>
      </div>
    </div>
  );
};
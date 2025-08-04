import { create } from 'zustand';
import { Job, JobApplication, JobSeeker } from '../types';

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  setCurrentJob: (job: Job) => void;
  updateApplicationStatus: (applicationId: string, status: 'shortlisted' | 'rejected') => void;
}

// Mock job applications data
const mockJobSeekers: JobSeeker[] = [
  {
    id: '2',
    name: 'John Doe',
    email: 'john@email.com',
    role: 'jobseeker',
    currentPosition: 'Software Developer',
    currentCompany: 'Tech Corp',
    expectedSalary: 5000,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    experiences: [
      {
        id: '1',
        jobTitle: 'Software Developer',
        company: 'Tech Corp',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Developing web applications using React and Node.js. Led a team of 3 developers in creating a customer portal that increased user engagement by 40%.'
      }
    ]
  },
  {
    id: '3',
    name: 'Alice Smith',
    email: 'alice@email.com',
    role: 'jobseeker',
    currentPosition: 'Marketing Manager',
    currentCompany: 'Brand Co',
    expectedSalary: 4500,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    experiences: [
      {
        id: '2',
        jobTitle: 'Marketing Manager',
        company: 'Brand Co',
        startDate: '2021-03',
        endDate: 'Present',
        description: 'Managing digital marketing campaigns and social media strategy. Increased brand awareness by 60% through targeted campaigns.'
      }
    ]
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@email.com',
    role: 'jobseeker',
    currentPosition: 'UX Designer',
    currentCompany: 'Design Studio',
    expectedSalary: 4800,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    experiences: [
      {
        id: '3',
        jobTitle: 'UX Designer',
        company: 'Design Studio',
        startDate: '2020-08',
        endDate: 'Present',
        description: 'Creating user-centered designs for mobile and web applications. Improved user satisfaction scores by 35% through redesign initiatives.'
      }
    ]
  }
];

const mockJob: Job = {
  id: '1',
  title: 'Marketing Specialist',
  company: 'Retrai Corp',
  recruiterId: '1',
  applications: mockJobSeekers.map((jobSeeker, index) => ({
    id: `app-${index + 1}`,
    jobId: '1',
    jobSeeker,
    status: 'pending' as const,
    appliedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }))
};

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [mockJob],
  currentJob: mockJob,
  setCurrentJob: (job) => set({ currentJob: job }),
  updateApplicationStatus: (applicationId, status) => {
    const { currentJob } = get();
    if (currentJob) {
      const updatedApplications = currentJob.applications.map(app =>
        app.id === applicationId ? { ...app, status } : app
      );
      const updatedJob = { ...currentJob, applications: updatedApplications };
      set({ currentJob: updatedJob });
    }
  },
}));
import { create } from 'zustand';
import { User, JobSeeker } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<JobSeeker>) => void;
}

// Mock users for demo
const mockUsers = {
  recruiter: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'recruiter' as const,
  },
  jobseeker: {
    id: '2',
    name: 'John Doe',
    email: 'john@email.com',
    role: 'jobseeker' as const,
    phone: '+1234567890',
    domicile: 'New York, NY',
    expectedSalary: 5000,
    currentPosition: 'Software Developer',
    currentCompany: 'Tech Corp',
    experiences: [
      {
        id: '1',
        jobTitle: 'Software Developer',
        company: 'Tech Corp',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Developing web applications using React and Node.js'
      },
      {
        id: '2',
        jobTitle: 'Junior Developer',
        company: 'StartupXYZ',
        startDate: '2020-06',
        endDate: '2021-12',
        description: 'Built mobile applications and maintained legacy systems'
      }
    ]
  } as JobSeeker,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (updates) => {
    const currentUser = get().user;
    if (currentUser && currentUser.role === 'jobseeker') {
      const updatedUser = { ...currentUser, ...updates } as JobSeeker;
      set({ user: updatedUser });
    }
  },
}));

// Export mock users for easy access
export { mockUsers };
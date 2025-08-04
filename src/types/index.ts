export interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'jobseeker';
}

export interface JobSeeker extends User {
  phone?: string;
  domicile?: string;
  expectedSalary?: number;
  currentPosition?: string;
  currentCompany?: string;
  cvUrl?: string;
  videoUrl?: string;
  experiences: Experience[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSeeker: JobSeeker;
  status: 'pending' | 'shortlisted' | 'rejected';
  appliedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  recruiterId: string;
  applications: JobApplication[];
}
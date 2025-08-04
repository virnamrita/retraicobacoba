import React from 'react';
import { Route, Switch } from 'wouter';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { JobApplicationsPage } from './pages/JobApplicationsPage';
import { CandidateProfilePage } from './pages/CandidateProfilePage';
import { ProfilePage } from './pages/ProfilePage';
import { InterviewPage } from './pages/InterviewPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { FindJobsPage } from './pages/FindJobsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/job/:id" component={JobApplicationsPage} />
        <Route path="/candidate/:id" component={CandidateProfilePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/interview" component={InterviewPage} />
        <Route path="/applications" component={ApplicationsPage} />
        <Route path="/find-jobs" component={FindJobsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route>404 - Page Not Found</Route>
      </Switch>
    </Layout>
  );
}

export default App;
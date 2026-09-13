import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import Welcome from './pages/Welcome';
import PHQ9Assessment from './pages/PHQ9Assessment';
import InterventionPlan from './pages/InterventionPlan';
import ResourceFinder from './pages/ResourceFinder';
import FollowUp from './pages/FollowUp';
import Header from './components/Header';
import './App.css';

export default function App() {
  const { currentStep } = useAppStore();

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/assessment" element={<PHQ9Assessment />} />
          <Route path="/intervention" element={<InterventionPlan />} />
          <Route path="/resources" element={<ResourceFinder />} />
          <Route path="/followup" element={<FollowUp />} />
        </Routes>
      </div>
    </Router>
  );
}

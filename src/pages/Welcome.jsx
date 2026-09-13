import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { ArrowRight, Heart, Flower2 } from 'lucide-react';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  const { setUserName, userName } = useAppStore();
  const [name, setName] = useState(userName || '');
  const [step, setStep] = useState('welcome');

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name);
      setStep('ready');
    }
  };

  const handleStart = () => {
    navigate('/assessment');
  };

  return (
    <div className="welcome-container">
      {step === 'welcome' && (
        <div className="welcome-card">
          <div className="welcome-header">
            <Flower2 size={64} className="welcome-icon" />
            <h1>Welcome to Your Safety Plan</h1>
            <p className="tagline">Your personal mental health companion</p>
          </div>

          <div className="welcome-content">
            <p className="welcome-text">
              This app guides you through a personalized mental health safety plan using evidence-based assessments.
            </p>

            <div className="features">
              <div className="feature-item">
                <Heart size={24} className="feature-icon" />
                <div>
                  <h3>PHQ-9 Assessment</h3>
                  <p>Quick, validated screening for mental health</p>
                </div>
              </div>

              <div className="feature-item">
                <Flower2 size={24} className="feature-icon" />
                <div>
                  <h3>Personalized Plan</h3>
                  <p>Tailored interventions based on your needs</p>
                </div>
              </div>

              <div className="feature-item">
                <Heart size={24} className="feature-icon" />
                <div>
                  <h3>Local Resources</h3>
                  <p>Find mental health services near you</p>
                </div>
              </div>

              <div className="feature-item">
                <Flower2 size={24} className="feature-icon" />
                <div>
                  <h3>Follow-up Tracking</h3>
                  <p>Adaptive check-ins based on your progress</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleNameSubmit} className="welcome-form">
            <div className="input-group">
              <label htmlFor="name">What's your name?</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="calm-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Continue <ArrowRight size={18} />
            </button>
          </form>
        </div>
      )}

      {step === 'ready' && (
        <div className="welcome-card ready-card">
          <div className="ready-header">
            <Flower2 size={48} className="ready-icon" />
            <h2>Hello, {name}!</h2>
            <p>Let's create your personalized safety plan</p>
          </div>

          <div className="ready-content">
            <p>This assessment will help us understand your current mental health and create the best support plan for you.</p>
            <p className="estimate">Estimated time: 5-10 minutes</p>
          </div>

          <div className="ready-actions">
            <button onClick={handleStart} className="btn btn-primary btn-large">
              Start Assessment <ArrowRight size={20} />
            </button>
            <button onClick={() => setStep('welcome')} className="btn btn-secondary">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

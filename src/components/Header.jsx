import React from 'react';
import { useAppStore } from '../store/appStore';
import { Heart, Leaf } from 'lucide-react';
import './Header.css';

export default function Header() {
  const { userName, phq9Total, severityLevel } = useAppStore();

  const getSeverityColor = (level) => {
    const colors = {
      minimal: '#10b981',
      mild: '#3b82f6',
      moderate: '#f59e0b',
      'moderately-severe': '#f97316',
      severe: '#ef4444'
    };
    return colors[level] || '#6366f1';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Leaf size={32} className="logo-icon" />
          <h1>Safety Plan Wellness</h1>
        </div>
        
        {userName && (
          <div className="user-status">
            <p className="greeting">Welcome, {userName}</p>
            {phq9Total > 0 && (
              <div className="status-indicator" style={{ borderLeftColor: getSeverityColor(severityLevel) }}>
                <Heart size={16} />
                <span className="status-text">{severityLevel.replace('-', ' ').toUpperCase()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

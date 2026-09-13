import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { ArrowRight, Heart, Brain, Users, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import './InterventionPlan.css';

const INTERVENTIONS_BY_SEVERITY = {
  minimal: {
    level: 'Minimal Depression',
    color: '#10b981',
    score: '0-4',
    description: 'You may experience some depressive symptoms, but they are minimal.',
    interventions: [
      {
        id: 1,
        title: 'Maintain Wellness',
        icon: Heart,
        items: [
          'Continue regular physical activity (30 minutes, 3-4 times per week)',
          'Maintain consistent sleep schedule (7-9 hours nightly)',
          'Eat balanced, nutritious meals',
          'Spend time in nature or outdoors daily'
        ]
      },
      {
        id: 2,
        title: 'Social Connection',
        icon: Users,
        items: [
          'Spend quality time with friends and family',
          'Engage in hobbies you enjoy',
          'Join social groups or clubs',
          'Schedule regular social activities'
        ]
      },
      {
        id: 3,
        title: 'Mindfulness',
        icon: Brain,
        items: [
          'Practice daily breathing exercises (5-10 minutes)',
          'Try meditation or mindfulness apps',
          'Keep a gratitude journal',
          'Practice progressive muscle relaxation'
        ]
      }
    ],
    nextFollowUp: '3 months',
    resources: 'Consider wellness resources and preventive care'
  },
  mild: {
    level: 'Mild Depression',
    color: '#3b82f6',
    score: '5-9',
    description: 'You have mild depressive symptoms. Consider implementing self-care strategies and monitoring your mood.',
    interventions: [
      {
        id: 1,
        title: 'Daily Routine',
        icon: Heart,
        items: [
          'Establish a structured daily routine',
          'Set achievable daily goals',
          'Schedule pleasurable activities',
          'Maintain consistent sleep and meal times'
        ]
      },
      {
        id: 2,
        title: 'Behavioral Activation',
        icon: Brain,
        items: [
          'Identify one activity daily that brings joy',
          'Gradually increase social engagement',
          'Start a physical activity program',
          'Break large tasks into smaller steps'
        ]
      },
      {
        id: 3,
        title: 'Support System',
        icon: Users,
        items: [
          'Reach out to trusted friends or family',
          'Join a support group',
          'Share your feelings with someone you trust',
          'Consider talking to a counselor or therapist'
        ]
      },
      {
        id: 4,
        title: 'When to Seek Help',
        icon: AlertCircle,
        items: [
          'If symptoms persist for more than 2 weeks',
          'If symptoms interfere with daily functioning',
          'If you notice thoughts of self-harm',
          'Contact a mental health professional'
        ]
      }
    ],
    nextFollowUp: '6-8 weeks',
    resources: 'Recommend scheduling an appointment with a mental health professional'
  },
  moderate: {
    level: 'Moderate Depression',
    color: '#f59e0b',
    score: '10-14',
    description: 'You have moderate depressive symptoms. Professional support is strongly recommended.',
    interventions: [
      {
        id: 1,
        title: 'Professional Support',
        icon: Phone,
        items: [
          'Schedule an appointment with a therapist or counselor',
          'Consider consultation with a psychiatrist',
          'Explore therapy options (CBT, DBT, IPT)',
          'Discuss medication evaluation with a doctor'
        ]
      },
      {
        id: 2,
        title: 'Immediate Self-Care',
        icon: Heart,
        items: [
          'Establish basic daily routine (sleep, meals, hygiene)',
          'Engage in one pleasant activity daily',
          'Limit isolation - spend time with supportive people',
          'Practice stress-reduction techniques (yoga, meditation)'
        ]
      },
      {
        id: 3,
        title: 'Safety Planning',
        icon: Brain,
        items: [
          'Identify warning signs of worsening mood',
          'Create a list of coping strategies',
          'Know your crisis resources and hotline numbers',
          'Share your plan with someone you trust'
        ]
      },
      {
        id: 4,
        title: 'Support Network',
        icon: Users,
        items: [
          'Inform trusted family or friends of your situation',
          'Join a support group for depression',
          'Consider peer support or online communities',
          'Schedule regular check-ins with supporters'
        ]
      }
    ],
    nextFollowUp: '2-4 weeks',
    resources: 'URGENT: Schedule mental health appointment within 1 week'
  },
  'moderately-severe': {
    level: 'Moderately Severe Depression',
    color: '#f97316',
    score: '15-19',
    description: 'You have moderately severe depressive symptoms. Immediate professional mental health care is essential.',
    interventions: [
      {
        id: 1,
        title: 'Urgent Professional Care',
        icon: AlertCircle,
        items: [
          'Schedule urgent appointment with mental health provider',
          'Contact your primary care doctor immediately',
          'Discuss medication options with a psychiatrist',
          'Consider intensive outpatient programs (IOP)'
        ]
      },
      {
        id: 2,
        title: 'Crisis Resources',
        icon: Phone,
        items: [
          'National Suicide Prevention Lifeline: 988',
          'Crisis Text Line: Text HOME to 741741',
          'SAMHSA National Helpline: 1-800-662-4357',
          'Go to nearest Emergency Room if in crisis'
        ]
      },
      {
        id: 3,
        title: 'Safety Plan',
        icon: Brain,
        items: [
          'Identify your warning signs immediately',
          'Create detailed safety plan with coping strategies',
          'Remove or secure access to means of self-harm',
          'Establish daily check-in with trusted person'
        ]
      },
      {
        id: 4,
        title: 'Daily Support',
        icon: Users,
        items: [
          'Maintain contact with support system daily',
          'Consider staying with trusted family/friend',
          'Attend all scheduled appointments',
          'Use crisis line as needed without hesitation'
        ]
      }
    ],
    nextFollowUp: '1 week (mandatory)',
    resources: 'CRITICAL: Seek mental health care TODAY - Contact emergency services if needed'
  },
  severe: {
    level: 'Severe Depression',
    color: '#ef4444',
    score: '20+',
    description: 'You have severe depressive symptoms. Immediate emergency intervention is required.',
    interventions: [
      {
        id: 1,
        title: '⚠️ IMMEDIATE ACTION REQUIRED',
        icon: AlertCircle,
        items: [
          'Call 911 or go to Emergency Room immediately',
          'Call National Suicide Prevention Lifeline: 988',
          'If not safe, go to nearest hospital emergency department',
          'Do not delay - seek help NOW'
        ]
      },
      {
        id: 2,
        title: 'Crisis Resources',
        icon: Phone,
        items: [
          '🚨 911 - Emergency Services',
          '☎️ 988 - Suicide & Crisis Lifeline (24/7)',
          '💬 Crisis Text Line: Text HOME to 741741',
          '🏥 Go to nearest Emergency Room'
        ]
      },
      {
        id: 3,
        title: 'Emergency Plan',
        icon: Brain,
        items: [
          'Have crisis contacts readily available',
          'Know location of nearest emergency room',
          'Remove access to means of self-harm',
          'Stay with trusted person or in safe location'
        ]
      },
      {
        id: 4,
        title: 'After Emergency Support',
        icon: Users,
        items: [
          'Follow up with emergency room recommendations',
          'Continue with prescribed treatment',
          'Maintain daily contact with mental health provider',
          'Keep crisis numbers accessible at all times'
        ]
      }
    ],
    nextFollowUp: 'Immediate (within 24 hours)',
    resources: 'CRISIS ALERT: Seek emergency services immediately - Your life matters'
  }
};

export default function InterventionPlan() {
  const navigate = useNavigate();
  const { phq9Total, severityLevel, userName, setFollowUpSchedule } = useAppStore();
  const intervention = INTERVENTIONS_BY_SEVERITY[severityLevel];
  const [expandedId, setExpandedId] = useState(null);

  const handleContinue = () => {
    setFollowUpSchedule(intervention.nextFollowUp);
    navigate('/resources');
  };

  if (!intervention) {
    return (
      <div className="intervention-error">
        <p>Unable to generate intervention plan. Please retake the assessment.</p>
        <button onClick={() => navigate('/assessment')} className="btn btn-primary">
          Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="intervention-container">
      <div className="intervention-card">
        <div className="intervention-header" style={{ borderTopColor: intervention.color }}>
          <div className="score-badge" style={{ backgroundColor: intervention.color }}>
            {phq9Total}
          </div>
          <div className="header-content">
            <h1>{intervention.level}</h1>
            <p className="score-range">PHQ-9 Score: {intervention.score}</p>
            <p className="description">{intervention.description}</p>
          </div>
        </div>

        <div className="resources-alert" style={{ borderLeftColor: intervention.color }}>
          <AlertCircle size={20} style={{ color: intervention.color }} />
          <p style={{ color: intervention.color, fontWeight: 600 }}>
            {intervention.resources}
          </p>
        </div>

        <div className="interventions-list">
          <h2 className="interventions-title">Your Personalized Care Plan</h2>
          
          {intervention.interventions.map((intervention) => {
            const IconComponent = intervention.icon;
            const isExpanded = expandedId === intervention.id;
            
            return (
              <div key={intervention.id} className="intervention-item">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : intervention.id)}
                  className="intervention-header-btn"
                >
                  <div className="intervention-title-section">
                    <IconComponent size={24} className="intervention-icon" />
                    <h3>{intervention.title}</h3>
                  </div>
                  <div className={`chevron ${isExpanded ? 'expanded' : ''}`}>
                    <ArrowRight size={20} />
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="intervention-content">
                    <ul className="intervention-items">
                      {intervention.items.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={18} className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="followup-info">
          <h3>Follow-up Check-in</h3>
          <p>Based on your assessment results, your next screening is recommended in:</p>
          <div className="followup-badge">
            <strong>{intervention.nextFollowUp}</strong>
          </div>
        </div>

        <div className="intervention-actions">
          <button onClick={handleContinue} className="btn btn-primary btn-large">
            Find Mental Health Resources
            <ArrowRight size={20} />
          </button>
          <button onClick={() => navigate('/assessment')} className="btn btn-secondary btn-large">
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

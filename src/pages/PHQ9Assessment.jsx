import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './PHQ9Assessment.css';

const PHQ9_QUESTIONS = [
  {
    id: 1,
    question: 'Little interest or pleasure in doing things',
    category: 'Anhedonia'
  },
  {
    id: 2,
    question: 'Feeling down, depressed, or hopeless',
    category: 'Depressed Mood'
  },
  {
    id: 3,
    question: 'Trouble falling or staying asleep, or sleeping too much',
    category: 'Sleep Disturbance'
  },
  {
    id: 4,
    question: 'Feeling tired or having little energy',
    category: 'Fatigue'
  },
  {
    id: 5,
    question: 'Poor appetite or overeating',
    category: 'Appetite Change'
  },
  {
    id: 6,
    question: 'Feeling bad about yourself — or that you are a failure or have let your family down',
    category: 'Self-Esteem'
  },
  {
    id: 7,
    question: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    category: 'Concentration'
  },
  {
    id: 8,
    question: 'Moving or speaking so slowly that others have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    category: 'Psychomotor'
  },
  {
    id: 9,
    question: 'Thoughts that you would be better off dead or of hurting yourself in some way',
    category: 'Suicidal Ideation'
  }
];

const RESPONSE_OPTIONS = [
  { value: 0, label: 'Not at all', color: '#10b981' },
  { value: 1, label: 'Several days', color: '#3b82f6' },
  { value: 2, label: 'More than half the days', color: '#f59e0b' },
  { value: 3, label: 'Nearly every day', color: '#ef4444' }
];

export default function PHQ9Assessment() {
  const navigate = useNavigate();
  const { setPHQ9Scores } = useAppStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const handleAnswer = (value) => {
    const newScores = { ...scores, [PHQ9_QUESTIONS[currentQuestion].id]: value };
    setScores(newScores);
    
    // Check for crisis response (question 9: suicidal ideation)
    if (PHQ9_QUESTIONS[currentQuestion].id === 9 && value > 0) {
      setShowWarning(true);
    }

    // Move to next question
    if (currentQuestion < PHQ9_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(scores).length === PHQ9_QUESTIONS.length) {
      setPHQ9Scores(scores);
      navigate('/intervention');
    }
  };

  const progress = ((Object.keys(scores).length) / PHQ9_QUESTIONS.length) * 100;
  const currentScore = scores[PHQ9_QUESTIONS[currentQuestion].id];
  const totalAnswered = Object.keys(scores).length;

  return (
    <div className="assessment-container">
      {showWarning && (
        <div className="crisis-alert">
          <div className="crisis-content">
            <h3>If you're in crisis, please reach out immediately</h3>
            <p>National Suicide Prevention Lifeline: <strong>988</strong></p>
            <p>Crisis Text Line: Text HOME to <strong>741741</strong></p>
            <p>Emergency: Call <strong>911</strong></p>
            <button onClick={() => setShowWarning(false)} className="btn btn-secondary">
              I understand, continue assessment
            </button>
          </div>
        </div>
      )}

      <div className="assessment-card">
        <div className="assessment-header">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">
              Question {currentQuestion + 1} of {PHQ9_QUESTIONS.length}
            </p>
          </div>
        </div>

        <div className="assessment-content">
          <div className="question-section">
            <h2 className="question-text">
              {PHQ9_QUESTIONS[currentQuestion].question}
            </h2>
            <p className="question-helper">
              Over the last 2 weeks, how often have you been bothered by...
            </p>
          </div>

          <div className="options-section">
            {RESPONSE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`option-button ${currentScore === option.value ? 'selected' : ''}`}
                style={{
                  borderColor: currentScore === option.value ? option.color : 'var(--border-calm)',
                  backgroundColor: currentScore === option.value ? `${option.color}10` : 'white'
                }}
              >
                <div className="option-radio">
                  {currentScore === option.value && (
                    <div className="radio-filled" style={{ backgroundColor: option.color }}></div>
                  )}
                </div>
                <div className="option-content">
                  <p className="option-label">{option.label}</p>
                  <p className="option-score">Score: {option.value}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="question-category">
            <p>Measuring: <strong>{PHQ9_QUESTIONS[currentQuestion].category}</strong></p>
          </div>
        </div>

        <div className="assessment-footer">
          <div className="button-group">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn btn-secondary"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion === PHQ9_QUESTIONS.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={totalAnswered !== PHQ9_QUESTIONS.length}
                className="btn btn-primary"
              >
                <CheckCircle2 size={18} />
                Complete Assessment
              </button>
            ) : (
              <button
                onClick={() => currentScore !== undefined && setCurrentQuestion(currentQuestion + 1)}
                disabled={currentScore === undefined}
                className="btn btn-primary"
              >
                Next
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          <div className="answers-summary">
            <p className="summary-title">Answers: {totalAnswered}/{PHQ9_QUESTIONS.length}</p>
            <div className="answered-list">
              {PHQ9_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`answer-dot ${scores[q.id] !== undefined ? 'answered' : 'unanswered'}`}
                  onClick={() => setCurrentQuestion(idx)}
                  title={`Q${q.id}: ${scores[q.id] !== undefined ? `Answered - Score: ${scores[q.id]}` : 'Not answered'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

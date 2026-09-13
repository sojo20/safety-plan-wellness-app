import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // User data
      userId: null,
      userLocation: null,
      userName: '',

      // Assessment data
      phq9Scores: {},
      phq9Total: 0,
      severityLevel: 'minimal', // minimal, mild, moderate, moderately-severe, severe
      assessmentDate: null,

      // Safety plan data
      safetyPlan: {
        warningSigns: [],
        internalCopingStrategies: [],
        socialSupports: [],
        professionalServices: [],
        crisis: {
          helplineNumber: '',
          emergencyServices: '911'
        }
      },

      // Follow-up tracking
      followUpSchedule: null,
      lastAssessmentDate: null,
      nextFollowUpDate: null,

      // UI state
      currentStep: 'welcome',
      isLoading: false,

      // Actions
      setUserId: (id) => set({ userId: id }),
      setUserLocation: (location) => set({ userLocation: location }),
      setUserName: (name) => set({ userName: name }),
      setPHQ9Scores: (scores) => {
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const severity = calculateSeverity(total);
        set({
          phq9Scores: scores,
          phq9Total: total,
          severityLevel: severity,
          assessmentDate: new Date().toISOString(),
          lastAssessmentDate: new Date().toISOString()
        });
      },
      setSafetyPlan: (plan) => set({ safetyPlan: plan }),
      setFollowUpSchedule: (schedule) => set({ followUpSchedule: schedule, nextFollowUpDate: schedule }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      reset: () => set({
        phq9Scores: {},
        phq9Total: 0,
        severityLevel: 'minimal',
        assessmentDate: null,
        safetyPlan: {
          warningSigns: [],
          internalCopingStrategies: [],
          socialSupports: [],
          professionalServices: [],
          crisis: { helplineNumber: '', emergencyServices: '911' }
        }
      })
    }),
    {
      name: 'safety-plan-store',
      partialize: (state) => ({
        userId: state.userId,
        userName: state.userName,
        userLocation: state.userLocation,
        safetyPlan: state.safetyPlan,
        lastAssessmentDate: state.lastAssessmentDate,
        nextFollowUpDate: state.nextFollowUpDate
      })
    }
  )
);

function calculateSeverity(total) {
  if (total <= 4) return 'minimal';
  if (total <= 9) return 'mild';
  if (total <= 14) return 'moderate';
  if (total <= 19) return 'moderately-severe';
  return 'severe';
}

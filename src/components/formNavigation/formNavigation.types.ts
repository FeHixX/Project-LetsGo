export interface FormNavigationProps {
  className?: string
  currentStep: number;
  setStep: (step: number) => void;
  activeStep: number;
}
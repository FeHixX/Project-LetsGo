export interface StepTwoItineraryProps {
  className?: string;
  data: {
    countries: string[];
  };
  updateData: (data: { countries: string[] }) => void;
  nextStep: () => void;
  prevStep: () => void;
}
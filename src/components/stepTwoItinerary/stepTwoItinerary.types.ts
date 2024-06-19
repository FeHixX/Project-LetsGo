export interface StepTwoItineraryProps {
  className?: string;
  data: {
    countries: string[];
  };
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

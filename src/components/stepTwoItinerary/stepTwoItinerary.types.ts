export interface StepTwoItineraryProps {
  className?: string;
  data: {
    countries: string[];
  };
  updateCountries: (data: { countries: string[] }) => void;
  nextStep: () => void;
  prevStep: () => void;
}
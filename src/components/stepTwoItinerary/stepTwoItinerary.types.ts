export interface StepTwoItineraryProps {
  className?: string;
  data: {
    countries: string[];
  };
  updateCountries: (data: { countries: Country[] }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface Country {
  name: { common: string; rus: string };
  flags: {
    png: string;
    svg: string;
  };
  continent: string[];
  island: boolean;
  description?: string;
}
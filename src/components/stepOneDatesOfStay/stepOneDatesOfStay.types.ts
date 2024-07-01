export interface StepOneDatesOfStayProps {
  updateData: (data: Partial<{
    numPeople: number;
    duration: number;
    dates: string[];
    children: boolean;
  }>) => void;
  nextStep: () => void;
  className?: string;
  data: {
    numPeople: number;
    duration: number;
    dates: string[];
    children: boolean;
  };
}
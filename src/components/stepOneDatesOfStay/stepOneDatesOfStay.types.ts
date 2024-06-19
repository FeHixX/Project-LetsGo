export interface StayDates {
  numPeople: number;
  duration: number;
  dates: string[];
}

export interface StepOneDatesOfStayProps {
  className?: string;
  data: StayDates;
  updateData: (newData: Partial<StayDates>) => void;
  nextStep: () => void;
}
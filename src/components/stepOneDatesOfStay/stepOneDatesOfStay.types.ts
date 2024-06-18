export interface stepOneDatesOfStayProps {
  className?: string;
  data: {
    numPeople: number;
    duration: number;
    dates: string[];
  };
  updateData: (newData: any) => void;
  nextStep: () => void;
}
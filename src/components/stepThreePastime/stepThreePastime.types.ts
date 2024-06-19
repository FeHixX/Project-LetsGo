export interface StepThreePastimeProps {
  className?: string
  data: Record<string, unknown>;
  prevStep: () => void;
  updateData: (data: any) => void;
}
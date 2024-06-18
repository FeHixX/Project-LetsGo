import { FC } from 'react';

export const StepTwoItinerary: FC<{ data: any; updateData: (data: any) => void; nextStep: () => void; prevStep: () => void }> = ({ data, updateData, nextStep, prevStep }) => {
  const handleNext = () => {
    // Implement form validation if needed
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Шаг 2. Маршрут</h2>
      {/* Implement form fields and binding here */}
      <button onClick={handlePrev}>На шаг назад</button>
      <button onClick={handleNext}>Следующий шаг</button>
    </div>
  );
};

export default StepTwoItinerary;
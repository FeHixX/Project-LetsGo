import { FC } from 'react';

export const StepTwoItinerary: FC<{ data: any; updateData: (data: any) => void; nextStep: () => void; prevStep: () => void }> = ({ data, updateData, nextStep, prevStep }) => {
  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div>
      <h2>Шаг 2. Маршрут</h2>
      <button onClick={handlePrev}>На шаг назад</button>
      <button onClick={handleNext}>Следующий шаг</button>
    </div>
  );
};

export default StepTwoItinerary;
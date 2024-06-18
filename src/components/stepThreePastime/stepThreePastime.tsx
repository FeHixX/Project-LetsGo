import { FC } from 'react';

export const StepThreePastime: FC<{ data: any; updateData: (data: any) => void; prevStep: () => void }> = ({ data, updateData, prevStep }) => {
  const handlePrev = () => {
    prevStep();
  };

  const handleSubmit = () => {
    // Implement form submission
    console.log('Form submitted:', data);
  };

  return (
    <div>
      <h2>Шаг 3. Развлечения</h2>
      {/* Implement form fields and binding here */}
      <button onClick={handlePrev}>На шаг назад</button>
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
};

export default StepThreePastime;
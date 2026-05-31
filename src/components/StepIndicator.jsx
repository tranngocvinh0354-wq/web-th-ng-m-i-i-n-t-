import React from 'react';

export const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="checkout-steps">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step ${
            currentStep === step.number
              ? 'active'
              : currentStep > step.number
              ? 'completed'
              : ''
          }`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

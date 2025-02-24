import { useState } from "react";
import { ChooseTemplate } from "./features/choose-template";
import { Stepper, StepperContent } from "@/components/ui/stepper";

const steps = [
  {
    title: "Template",
    description: "Choose template",
  },
  {
    title: "Information",
    description: "Personal details",
  },
  {
    title: "Generate",
    description: "Generate document",
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="container mt-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        className="mb-8 w-1/2 mx-auto"
      />
      <StepperContent step={1} currentStep={currentStep}>
        <ChooseTemplate />
      </StepperContent>
    </div>
  );
}

export default App;

import { useState } from "react";
import { ChooseTemplate } from "./features/choose-template";
import { Stepper, StepperContent } from "@/components/ui/stepper";
import { PersonalDetails } from "./features/personal-details";
import { GenerateDocument } from "./features/generate-document";
import { Provider } from "./provider";
import { useAppContext } from "./hooks/useAppContext";

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
  const { currentScreen, setCurrentScreen } = useAppContext();

  return (
    <div className="container mt-4">
      <Stepper
        steps={steps}
        currentStep={currentScreen}
        onStepClick={setCurrentScreen}
        className="mb-8 w-1/2 mx-auto"
      />
      <StepperContent step={1} currentStep={currentScreen}>
        <ChooseTemplate />
      </StepperContent>
      <StepperContent step={2} currentStep={currentScreen}>
        <PersonalDetails />
      </StepperContent>
      <StepperContent step={3} currentStep={currentScreen}>
        <GenerateDocument />
      </StepperContent>
    </div>
  );
}

export default App;

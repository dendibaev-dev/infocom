import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
  ...props
}: StepperProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="relative flex flex-col md:flex-row w-full justify-center gap-4 md:gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          return (
            <React.Fragment key={step.title}>
              <button
                className="flex bg-primary/10 py-2 px-4 shrink-0 rounded-lg items-center relative"
                disabled={!onStepClick}
                onClick={() => onStepClick?.(index + 1)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "relative flex h-10 w-10 mr-4 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors text-primary",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary",
                    !isCompleted && !isCurrent && "border-muted bg-background"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <div className="flex flex-col items-start">
                  <div className="text-sm font-medium">{step.title}</div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export interface StepperContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  currentStep: number;
}

export function StepperContent({
  step,
  currentStep,
  className,
  children,
  ...props
}: StepperContentProps) {
  const isActive = step === currentStep;

  if (!isActive) return null;

  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
}

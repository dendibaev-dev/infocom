import { TemplateCard } from "./template-card";

export const ChooseTemplate = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <TemplateCard
        id="1"
        title="Questionnaire"
        description="A structured form designed to collect essential personal and professional information about an individual. It includes fields such as full name, date of birth, education, work experience, and family details, making it ideal for official or administrative purposes."
        image="/6679cfe18b7f3c8cb183e6325aeab5d4.jpg"
      />
    </div>
  );
};

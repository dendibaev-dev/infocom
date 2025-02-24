import { TemplateCard } from "./template-card";

export const ChooseTemplate = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <TemplateCard
        id="1"
        title="Questionnaire"
        description="A structured form designed to collect essential personal and professional information about an individual. It includes fields such as full name, date of birth, education, work experience, and family details, making it ideal for official or administrative purposes."
        image="https://static-cse.canva.com/blob/1857645/1237w--EmzvhfvtTQ.jpg"
      />
      <TemplateCard
        id="2"
        title="CV"
        description="A comprehensive document highlighting an individual's professional background, skills, education, and achievements. It is typically used for job applications, academic positions, or career advancement opportunities."
        image="https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg"
      />
    </div>
  );
};

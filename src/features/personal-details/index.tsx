import { z } from "zod";
import { Form } from "./form";

const foreignLanguageSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const formSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.date(),
  placeOfBirth: z.string(),
  nationality: z.string(),
  partyAffiliation: z.string(),
  education: z.string(),
  specialization: z.string(),
  foreignLanguages: z.array(foreignLanguageSchema).min(1),
  militaryRank: z.string(),
  stateAndDepartmentalAwards: z.string(),
  workExperience: z.string(),
  informationAboutRelatives: z.string(),
});

export const PersonalDetails = () => {
  function submitForm(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form
        onSubmit={submitForm}
        initialValues={{
          fullName: "",
          dateOfBirth: new Date(),
          placeOfBirth: "",
          nationality: "",
          partyAffiliation: "",
          education: "",
          specialization: "",
          foreignLanguages: [],
          militaryRank: "",
          stateAndDepartmentalAwards: "",
          workExperience: "",
          informationAboutRelatives: "",
        }}
      />
    </div>
  );
};

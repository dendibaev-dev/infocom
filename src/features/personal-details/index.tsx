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
  workExperience: z
    .array(
      z.object({
        organization: z.string().min(1, "Organization name is required"),
        dateFrom: z.date().nullable(),
        dateTo: z.date().nullable(),
      })
    )
    .min(1, "At least one work experience entry is required"),
  informationAboutRelatives: z
    .array(
      z.object({
        fullName: z.string().min(1, "Full name is required"),
        degreeOfKinship: z.string().min(1, "Degree Of Kinship is required"),
        dateOfBirth: z.date().nullable(),
        placeOfWork: z.string().min(1, "Place Of Work is required"),
        position: z.string().min(1, "Position is required"),
        address: z.string().min(1, "Address is required"),
      })
    )
    .min(1, "At least one relative must be added"),
});

export const PersonalDetails = () => {
  function submitForm(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full mx-auto">
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
          workExperience: [
            {
              organization: "",
              dateFrom: null,
              dateTo: null,
            },
          ],
          informationAboutRelatives: [
            {
              fullName: "",
              degreeOfKinship: "",
              dateOfBirth: null,
              placeOfWork: "",
              position: "",
              address: "",
            },
          ],
        }}
      />
    </div>
  );
};

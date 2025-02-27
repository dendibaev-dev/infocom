import { z } from "zod";
import { useAppContext } from "@/hooks/useAppContext";
import { Form } from "./form";

const foreignLanguageSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const formSchema = z.object({
  fullName: z.string().min(10, "required"),
  dateOfBirth: z.date().refine((value) => value !== null, "Обязательное поле"),
  placeOfBirth: z.string().min(4, "required"),
  nationality: z.string().min(1, "required"),
  partyAffiliation: z.string(),
  education: z.string().min(1, "required"),
  specialization: z.string().min(1, "required"),
  foreignLanguages: z.array(foreignLanguageSchema),
  militaryRank: z.string().min(1, "required"),
  stateAndDepartmentalAwards: z.string(),
  workExperience: z.array(
    z.object({
      organization: z.string(),
      dateFrom: z.date().nullable(),
      dateTo: z.date().nullable(),
    })
  ),
  informationAboutRelatives: z.array(
    z.object({
      fullName: z.string(),
      degreeOfKinship: z.string(),
      dateOfBirth: z.date().nullable(),
      placeOfWork: z.string(),
      position: z.string(),
      address: z.string(),
    })
  ),
});

export const PersonalDetails = () => {
  const { formState, setFormState, setCurrentScreen } = useAppContext();

  function submitForm(values: z.infer<typeof formSchema>) {
    setFormState(values);
    setCurrentScreen(3);
  }

  return (
    <div className="w-full mx-auto">
      <Form onSubmit={submitForm} initialValues={formState} />
    </div>
  );
};

import { FC, lazy, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  form: UseFormReturn<any>;
}

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Ivanov Ivan Ivanovich",
  },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  {
    name: "placeOfBirth",
    label: "Place of Birth",
    type: "text",
    placeholder: "City, Country",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "select",
    options: [
      { label: "Uzbek", value: "Uzbek" },
      { label: "Karakalpak", value: "Karakalpak" },
      { label: "Kazakh", value: "Kazakh" },
      { label: "Russian", value: "Russian" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "partyAffiliation",
    label: "Party Affiliation",
    type: "switch",
    placeholder: "Has party affiliation",
  },
  {
    name: "education",
    label: "Education",
    type: "select",
    options: [
      { label: "Secondary", value: "Secondary" },
      { label: "Higher", value: "Higher" },
      { label: "Candidate of Sciences", value: "Candidate of Sciences" },
    ],
  },
  {
    name: "specialization",
    label: "Specialization",
    type: "text",
    placeholder: "Your profession",
  },
  {
    name: "foreignLanguages",
    label: "Foreign Languages",
    type: "multiselect",
    options: [
      { label: "English", value: "English" },
      { label: "German", value: "Deutsch" },
      { label: "French", value: "Franch" },
    ],
    placeholder: "Foreign language proficiency",
  },
  {
    name: "militaryRank",
    label: "Military Rank",
    type: "select",
    options: [
      { label: "None", value: "None" },
      { label: "Private", value: "Private" },
      { label: "Sergeant", value: "Sergeant" },
      { label: "Officer", value: "Officer" },
    ],
  },
  {
    name: "stateAndDepartmentalAwards",
    label: "State and Departmental Awards",
    type: "text",
    placeholder: "Awards, if any",
  },
];

const TextField = lazy(() =>
  import("@/components/form-fields").then((m) => ({
    default: m.TextField,
  }))
);
const DateField = lazy(() =>
  import("@/components/form-fields").then((m) => ({
    default: m.DateField,
  }))
);
const SelectField = lazy(() =>
  import("@/components/form-fields").then((m) => ({
    default: m.SelectField,
  }))
);
const SwitchField = lazy(() =>
  import("@/components/form-fields").then((m) => ({
    default: m.SwitchField,
  }))
);
const MultiSelectField = lazy(() =>
  import("@/components/form-fields").then((m) => ({
    default: m.MultiSelectField,
  }))
);

export const FormField: FC<Props> = ({ form }) => {
  const memoizedFields = useMemo(() => fields, []);

  return memoizedFields.map(({ name, label, type, placeholder, options }) => (
    <FormFieldUI
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          {type === "text" && (
            <TextField field={field} placeholder={placeholder} />
          )}
          {type === "date" && <DateField field={field} />}
          {type === "switch" && (
            <SwitchField field={field} name={name} placeholder={placeholder} />
          )}
          {type === "select" && <SelectField field={field} options={options} />}
          {type === "multiselect" && (
            <MultiSelectField
              field={field}
              options={options}
              placeholder={placeholder}
            />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

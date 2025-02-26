import { FC, lazy, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

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
      { label: "Uzbek", value: "1" },
      { label: "Karakalpak", value: "2" },
      { label: "Kazakh", value: "3" },
      { label: "Russian", value: "4" },
      { label: "Other", value: "5" },
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
      { label: "Secondary", value: "1" },
      { label: "Higher", value: "2" },
      { label: "Candidate of Sciences", value: "3" },
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
      { label: "English", value: "english" },
      { label: "German", value: "deutsch" },
      { label: "French", value: "franch" },
    ],
    placeholder: "Foreign language proficiency",
  },
  {
    name: "militaryRank",
    label: "Military Rank",
    type: "select",
    options: [
      { label: "None", value: "1" },
      { label: "Private", value: "2" },
      { label: "Sergeant", value: "3" },
      { label: "Officer", value: "4" },
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

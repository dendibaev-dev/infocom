import { FC } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { EditableTable } from "@/components/editable-table";

interface Props {
  form: UseFormReturn<any>;
  className?: string;
}

export const WorkExperienceTable: FC<Props> = ({ form, className }) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  return (
    <div className={`${className}`}>
      <EditableTable
        title="Work experience"
        columns={[
          {
            name: "organization",
            label: "Name of the organization, institution",
            type: "text",
            placeholder: "Uzinfocom",
          },
          {
            name: "dateFrom",
            label: "Date of admission (month, year)",
            type: "date",
            dateFormat: "MM.yyyy",
          },
          {
            name: "dateTo",
            label: "Date of dismissal (month, year)",
            type: "date",
            dateFormat: "MM.yyyy",
          },
        ]}
        fields={fields}
        append={() =>
          append(
            { organization: "", dateFrom: null, dateTo: null },
            {
              shouldFocus: false,
            }
          )
        }
        remove={remove}
        form={form}
        fieldName="workExperience"
      />
    </div>
  );
};

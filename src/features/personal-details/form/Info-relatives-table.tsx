import { EditableTable } from "@/components/editable-table";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
  className?: string;
}

export const InfoRelativesTable: FC<Props> = ({ form, className }) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "informationAboutRelatives",
  });

  return (
    <div className={`${className}`}>
      <EditableTable
        title="Information about relatives"
        columns={[
          {
            name: "fullName",
            label: "Full name",
            type: "text",
            placeholder: "Ivanov Ivan Ivanovich",
          },
          {
            name: "degreeOfKinship",
            label: "Degree of kinship",
            type: "select",
            placeholder: "Ivanov Ivan Ivanovich",
            options: [
              { label: "Mother", value: "mother" },
              { label: "Father", value: "father" },
              { label: "Husband", value: "husband" },
              { label: "Wife", value: "wife" },
              { label: "Brother", value: "brother" },
              { label: "Sister", value: "sister" },
              { label: "Daughter", value: "daughter" },
              { label: "Son", value: "son" },
              { label: "Relative", value: "relative" },
            ],
          },
          {
            name: "dateOfBirth",
            label: "Date of birth",
            type: "date",
            dateFormat: "dd.MM.yyyy",
          },
          {
            name: "placeOfWork",
            label: "Place of work",
            type: "text",
            placeholder: "Uzinfocom",
          },
          {
            name: "position",
            label: "Position",
            type: "text",
            placeholder: "Manager",
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "A.Dosnazarov 45",
          },
        ]}
        fields={fields}
        append={() =>
          append({
            fullName: "",
            degreeOfKinship: "",
            dateOfBirth: null,
            placeOfWork: "",
            position: "",
            address: "",
          })
        }
        remove={remove}
        form={form}
        fieldName="informationAboutRelatives"
      />
    </div>
  );
};

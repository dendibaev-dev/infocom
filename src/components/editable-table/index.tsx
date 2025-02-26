import { FC, useMemo, lazy, Suspense, memo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

type Column = {
  name: string;
  label: string;
  type: "text" | "date" | "select";
  placeholder?: string;
  dateFormat?: "dd.MM.yyyy" | "MM.yyyy";
  options?: { label: string; value: string }[];
};

interface Props {
  title: string;
  columns: Column[];
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  form: UseFormReturn<any>;
  fieldName: string;
}

const FieldRenderer: FC<{
  type: string;
  field: any;
  placeholder?: string;
  dateFormat?: string;
  options?: any[];
}> = memo(({ type, field, dateFormat, placeholder, options }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {type === "text" && <TextField field={field} placeholder={placeholder} />}
    {type === "date" && <DateField field={field} dateFormat={dateFormat} />}
    {type === "select" && <SelectField field={field} options={options} />}
  </Suspense>
));

export const EditableTable: FC<Props> = memo(
  ({ title, columns, fields, append, remove, form, fieldName }) => {
    const tableHeaders = useMemo(
      () =>
        columns.map((column) => (
          <TableHead key={column.name}>{column.label}</TableHead>
        )),
      [columns]
    );

    const tableRows = useMemo(
      () =>
        fields.map((row, index) => (
          <TableRow key={row.id}>
            {columns.map(({ type, name, placeholder, options, dateFormat }) => (
              <TableCell key={`${row.id}_${name}`}>
                <Controller
                  control={form.control}
                  name={`${fieldName}.${index}.${name}`}
                  render={({ field }) => (
                    <FieldRenderer
                      type={type}
                      field={field}
                      placeholder={placeholder}
                      dateFormat={dateFormat}
                      options={options}
                    />
                  )}
                />
              </TableCell>
            ))}
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete row</span>
              </Button>
            </TableCell>
          </TableRow>
        )),
      [fields, columns, fieldName]
    );

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium">{title}</h2>
          <Button onClick={append} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>{tableHeaders}</TableRow>
            </TableHeader>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
);

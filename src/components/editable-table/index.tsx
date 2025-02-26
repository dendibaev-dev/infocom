import { FC } from "react";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TextField: FC<any> = ({ field }) => (
  <Input {...field} placeholder={field.placeholder} />
);

const DateField: FC<any> = ({ field, dateFormat }) => (
  <DatePicker
    date={field.value}
    onDateChange={field.onChange}
    dateFormat={dateFormat}
  />
);

const SelectField: FC<any> = ({ field, options }) => (
  <Select value={field.value} onValueChange={field.onChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select" />
    </SelectTrigger>
    <SelectContent>
      {options?.map((opt: { label: string; value: string }) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

type Column = {
  name: string;
  label: string;
  type: string;
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

export const EditableTable: FC<Props> = ({
  title,
  columns,
  fields,
  append,
  remove,
  form,
  fieldName,
}) => {
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
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.name}>{column.label}</TableHead>
              ))}
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((row, index) => (
              <TableRow key={row.id}>
                {columns.map(({ type, name, options, dateFormat }) => (
                  <TableCell key={name}>
                    <Controller
                      control={form.control}
                      name={`${fieldName}.${index}.${name}`}
                      render={({ field }) => {
                        if (type === "text") {
                          return <TextField field={field} />;
                        }
                        if (type === "date") {
                          return (
                            <DateField field={field} dateFormat={dateFormat} />
                          );
                        }
                        if (type === "select") {
                          return (
                            <SelectField field={field} options={options} />
                          );
                        }
                        return <></>;
                      }}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

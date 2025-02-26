import { FC } from "react";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl } from "../ui/form";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import MultipleSelector from "../ui/multiple-selector";

export const TextField: FC<any> = ({ field, placeholder }) => {
  return <Input {...field} placeholder={placeholder} />;
};

export const DateField: FC<any> = ({ field, dateFormat }) => (
  <DatePicker
    date={field.value}
    onDateChange={field.onChange}
    dateFormat={dateFormat}
  />
);

export const SelectField: FC<any> = ({ field, options }) => (
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

export const SwitchField: FC<any> = ({ field, name, placeholder }) => (
  <FormControl className="flex">
    <div className="flex items-center space-x-2">
      <Switch
        id={name}
        checked={field.value === "yes"}
        onCheckedChange={(v) => field.onChange(v ? "yes" : "no")}
      />
      <Label htmlFor={name} className="font-normal text-muted-foreground">
        {placeholder}
      </Label>
    </div>
  </FormControl>
);

export const MultiSelectField: FC<any> = ({ field, options, placeholder }) => (
  <MultipleSelector
    defaultOptions={options}
    placeholder={placeholder}
    value={field.value}
    onChange={field.onChange}
    hidePlaceholderWhenSelected
    emptyIndicator={
      <p className="text-center text-xs leading-10 text-gray-600 dark:text-gray-400">
        no results found.
      </p>
    }
  />
);

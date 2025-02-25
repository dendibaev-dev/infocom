import * as React from "react";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(
    date
  );

  // Update input value and calendar date when date changes externally
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd.MM.yyyy"));
      setCalendarDate(date);
    } else {
      setInputValue("");
      setCalendarDate(undefined);
    }
  }, [date]);

  // Format input value with dots
  const formatInputValue = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Limit to 8 digits (ddMMYYYY)
    const limitedDigits = digits.slice(0, 8);

    // Add dots after day and month
    let formattedValue = "";
    for (let i = 0; i < limitedDigits.length; i++) {
      if (i === 2 || i === 4) {
        formattedValue += ".";
      }
      formattedValue += limitedDigits[i];
    }

    return formattedValue;
  };

  // Handle manual date input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatInputValue(rawValue);
    setInputValue(formattedValue);
    setError("");

    // Only attempt to parse if we have a complete date
    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, "dd.MM.yyyy", new Date());

      if (isValid(parsedDate)) {
        onDateChange(parsedDate);
        setCalendarDate(parsedDate); // Update calendar date when input is valid
      } else {
        setError("Invalid date");
      }
    } else if (formattedValue.length === 0) {
      onDateChange(undefined);
      setCalendarDate(undefined);
    }
  };

  // Handle calendar selection
  const handleCalendarSelect = (newDate: Date | undefined) => {
    onDateChange(newDate);
    setCalendarDate(newDate);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle calendar icon click
  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  // Handle keydown for special keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: Backspace, Delete, ArrowLeft, ArrowRight, Tab
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab"
    ) {
      return;
    }

    // Block any non-digit keys
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.select()}
            placeholder="DD.MM.YYYY"
            className={cn("pl-10", error && "border-destructive", className)}
          />
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 h-full px-2 hover:bg-transparent"
              onClick={handleCalendarClick}
            >
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open calendar</span>
            </Button>
          </PopoverTrigger>
          {error && (
            <span className="absolute -bottom-5 left-0 text-xs text-destructive">
              {error}
            </span>
          )}
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={calendarDate}
            defaultMonth={calendarDate}
            onSelect={handleCalendarSelect}
            initialFocus
            weekStartsOn={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

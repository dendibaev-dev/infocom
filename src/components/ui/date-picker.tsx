import * as React from "react";
import { isValid, parse, format, startOfMonth } from "date-fns";
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
  /**
   * Format pattern for the date
   * - "dd.MM.yyyy" - Day, month, year (default)
   * - "MM.yyyy" - Month and year only
   */
  dateFormat?: "dd.MM.yyyy" | "MM.yyyy";
}

export function DatePicker({
  date,
  onDateChange,
  className,
  dateFormat = "dd.MM.yyyy", // default format
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(
    date
  );

  // Get format specific configurations
  const formatConfig = React.useMemo(() => {
    const configs = {
      "dd.MM.yyyy": {
        placeholder: "DD.MM.YYYY",
        maxLength: 10,
        digitsLength: 8,
        formatDots: (digits: string) => {
          let result = "";
          for (let i = 0; i < digits.length; i++) {
            if (i === 2 || i === 4) result += ".";
            result += digits[i];
          }
          return result;
        },
      },
      "MM.yyyy": {
        placeholder: "MM.YYYY",
        maxLength: 7,
        digitsLength: 6,
        formatDots: (digits: string) => {
          let result = "";
          for (let i = 0; i < digits.length; i++) {
            if (i === 2) result += ".";
            result += digits[i];
          }
          return result;
        },
      },
    };
    return configs[dateFormat];
  }, [dateFormat]);

  // Update input value and calendar date when date changes externally
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, dateFormat));
      setCalendarDate(date);
    } else {
      setInputValue("");
      setCalendarDate(undefined);
    }
  }, [date, dateFormat]);

  // Format input value with dots
  const formatInputValue = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Limit to max digits
    const limitedDigits = digits.slice(0, formatConfig.digitsLength);

    // Add dots according to format
    return formatConfig.formatDots(limitedDigits);
  };

  // Handle manual date input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatInputValue(rawValue);
    setInputValue(formattedValue);
    setError("");

    // Only attempt to parse if we have a complete date
    if (formattedValue.length === formatConfig.maxLength) {
      const parsedDate = parse(formattedValue, dateFormat, new Date());

      if (isValid(parsedDate)) {
        // For MM.yyyy format, set the date to the start of the month
        const finalDate =
          dateFormat === "MM.yyyy" ? startOfMonth(parsedDate) : parsedDate;
        onDateChange(finalDate);
        setCalendarDate(finalDate);
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
    if (newDate) {
      // For MM.yyyy format, set the date to the start of the month
      const finalDate =
        dateFormat === "MM.yyyy" ? startOfMonth(newDate) : newDate;
      onDateChange(finalDate);
      setCalendarDate(finalDate);
    } else {
      onDateChange(undefined);
      setCalendarDate(undefined);
    }
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
            placeholder={formatConfig.placeholder}
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
            showOutsideDays={dateFormat === "dd.MM.yyyy"}
            {...(dateFormat === "MM.yyyy" && {
              fromMonth: new Date(2000, 0),
              toMonth: new Date(2100, 11),
              disabled: false,
            })}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

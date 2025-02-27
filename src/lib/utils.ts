import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertStringToSnakeCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");
}

type ProcessedPersonData = Omit<
  Form.FormState,
  "dateOfBirth" | "workExperience" | "informationAboutRelatives"
> & {
  dateOfBirth: string;
  workExperience: Array<
    Omit<Form.WorkExperience, "dateFrom" | "dateTo"> & {
      dateFrom: string;
      dateTo: string;
    }
  >;
  informationAboutRelatives: Array<
    Omit<Form.RelativeInfo, "dateOfBirth"> & { dateOfBirth: string }
  >;
};

function formatDate(
  dateString: string | Date | null,
  format: "dd.MM.yyyy" | "MM.yyyy" = "dd.MM.yyyy"
): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  if (format === "MM.yyyy") {
    return `${month}.${year}`;
  }
  return `${day}.${month}.${year}`;
}

export function processDates(data: Form.FormState): ProcessedPersonData {
  const processedData: ProcessedPersonData = {
    ...data,
    dateOfBirth: formatDate(data.dateOfBirth),
    workExperience: data.workExperience.map((experience) => ({
      ...experience,
      dateFrom: formatDate(experience.dateFrom, "MM.yyyy"),
      dateTo: formatDate(experience.dateTo, "MM.yyyy"),
    })),
    informationAboutRelatives: data.informationAboutRelatives.map(
      (relative) => ({
        ...relative,
        dateOfBirth: formatDate(relative.dateOfBirth),
      })
    ),
  };

  return processedData;
}

import { Button } from "@/components/ui/button";
import { generateDocx } from "@/lib/generate-docx";

const mockData = {
  fullName: "Dendibaev Arman Kayrat uli",
  dateOfBirth: "27.02.2025",
  placeOfBirth: "test",
  nationality: "test",
  partyAffiliation: "test",
  education: "test",
  specialization: "test",
  foreignLanguages: [
    {
      label: "test",
      value: "test",
    },
  ],
  militaryRank: "test",
  stateAndDepartmentalAwards: "test",
  workExperience: [
    {
      organization: "Test",
      dateFrom: "02.2025",
      dateTo: "02.2025",
    },
  ],
  data: [
    {
      fullName: "Test Test",
      degreeOfKinship: "wife",
      dateOfBirth: "27.02.2025",
      address: "test",
      placeOfWork: "test",
      position: "test",
    },
  ],
};

export const GenerateDocument = () => {
  const handleDownload = () => {
    generateDocx(mockData);
  };

  return <Button onClick={handleDownload}>Download</Button>;
};

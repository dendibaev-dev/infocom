import { CircleCheckBig, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/hooks/useAppContext";
import { generateDocx } from "@/lib/generate-docx";
import { processDates } from "@/lib/utils";

export const GenerateDocument = () => {
  const { formState } = useAppContext();

  if (!formState.fullName.length) {
    return <div className="text-md font-medium text-center">Empty</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center text-green-500">
        <CircleCheckBig className="w-4 h-4 mr-2" />
        <h2 className="text-md font-medium">
          Document generated is successfully
        </h2>
      </div>

      <Button
        onClick={() => generateDocx(processDates(formState))}
        variant="default"
        size="lg"
      >
        <FileDown className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form as FormUI } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { initialFormState } from "@/common/initial-form-state";
import { useAppContext } from "@/hooks/useAppContext";
import { formSchema } from "..";
import { FormField } from "./form-field";
import { WorkExperienceTable } from "./work-experience-table";
import { InfoRelativesTable } from "./Info-relatives-table";

interface Props {
  initialValues: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const Form: FC<Props> = ({ initialValues, onSubmit }) => {
  const { setFormState, setCurrentScreen } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <FormUI {...form}>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField form={form} />
        <WorkExperienceTable form={form} className="col-span-2" />
        <InfoRelativesTable form={form} className="col-span-2" />
        <Separator className="col-span-2" />
        <div className="col-span-2 flex items-center gap-2">
          <Button variant="outline" onClick={() => setCurrentScreen(1)}>
            Go back
          </Button>
          <Button
            className="ml-auto"
            variant="outline"
            onClick={(event) => {
              event.preventDefault();
              form.reset(initialFormState);
              setFormState(initialFormState);
            }}
          >
            Reset form
          </Button>
          <Button type="submit">Generate document</Button>
        </div>
      </form>
    </FormUI>
  );
};

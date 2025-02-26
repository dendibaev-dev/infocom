import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form as FormUI } from "@/components/ui/form";
import { formSchema } from "..";
import { FormField } from "./form-field";
import { Separator } from "@/components/ui/separator";
import { WorkExperienceTable } from "./work-experience-table";
import { InfoRelativesTable } from "./Info-relatives-table";

interface Props {
  initialValues: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const Form: FC<Props> = ({ initialValues, onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <FormUI {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField form={form} />
        <WorkExperienceTable form={form} className="col-span-2" />
        <InfoRelativesTable form={form} className="col-span-2" />
        <Separator className="col-span-2" />
        <div className="col-span-2 flex items-center gap-2">
          <Button variant="outline">Go back</Button>
          <Button
            className="ml-auto"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset form
          </Button>
          <Button type="submit">Save form</Button>
        </div>
      </form>
    </FormUI>
  );
};

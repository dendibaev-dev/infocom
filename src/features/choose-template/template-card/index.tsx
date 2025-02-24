import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface TemplateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description: string;
  image: string;
}

const TemplateCard = React.forwardRef<HTMLDivElement, TemplateCardProps>(
  ({ id, title, description, image, className, ...props }, ref) => (
    <Card
      ref={ref}
      className={`w-full max-w-sm overflow-hidden group ${className}`}
      {...props}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-full h-[300px] object-contain transition-transform group-hover:scale-125"
          />
        </div>
      </div>
      <CardHeader className="space-y-2">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/80"
          onClick={() => console.log("template selected: ", id)}
        >
          Choose template
        </Button>
      </CardFooter>
    </Card>
  )
);

TemplateCard.displayName = "TemplateCard";

export { TemplateCard };

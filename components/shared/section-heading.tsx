import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <Badge
          variant="solid"
          className={align === "center" ? "mx-auto mb-5 w-fit" : "mb-5 w-fit"}
        >
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

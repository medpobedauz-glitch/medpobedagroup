import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "section-kicker",
            centered && "justify-center",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.15] tracking-[-0.024em] text-[#071B3A] sm:text-4xl sm:leading-[1.1] lg:text-[3.35rem] lg:leading-[1.06]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "body-lg mt-5",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

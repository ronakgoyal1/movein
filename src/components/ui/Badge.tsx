import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "dark" | "muted";
}

export function Badge({ className, variant = "accent", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[0.6875rem] font-medium tracking-[0.09em] uppercase",
        {
          "bg-[#EEF1E4] text-[#6E7E5D]": variant === "accent",
          "bg-dark text-white": variant === "dark",
          "bg-[#EDE9E1] text-[#9E9B97] border border-border": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}

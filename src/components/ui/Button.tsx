import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark" | "whatsapp";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-sm font-medium tracking-wider uppercase transition-all duration-200 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none",
          {
            // Variants
            "bg-accent text-white border-[1.5px] border-accent hover:bg-[#5C6A4E] hover:border-[#5C6A4E] hover:shadow-md": variant === "primary",
            "bg-dark text-white border-[1.5px] border-dark hover:bg-primary hover:border-primary hover:shadow-md": variant === "dark",
            "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary hover:text-white": variant === "outline",
            "bg-transparent text-secondary border-[1.5px] border-border hover:text-primary hover:border-secondary": variant === "ghost",
            "bg-success text-white border-none hover:bg-[#20bd5a] hover:shadow-md": variant === "whatsapp",
            // Sizes
            "px-5 py-2.5 text-xs min-h-[40px]": size === "sm",
            "px-7 py-3.5 text-sm min-h-[52px]": size === "md",
            "px-9 py-4 text-[0.9rem] min-h-[60px]": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

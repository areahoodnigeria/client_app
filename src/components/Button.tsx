import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "default",
  size = "md",
  className,
  onClick,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    outline:
      "border border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",
    ghost: "text-foreground hover:bg-secondary hover:text-secondary-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

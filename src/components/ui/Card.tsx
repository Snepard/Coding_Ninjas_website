import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-soft",
      className,
    )}
  >
    {children}
  </div>
);

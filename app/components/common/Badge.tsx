import { cn } from "@/app/lib/helpers";
import { ReactNode } from "react";

type BadgeProps = {
  className?: string;
  children: ReactNode;
  shape?: "flat" | "pill";
  border?: boolean;
  size?: "small" | "normal";
};

const badgeShape = {
  flat: "rounded-md",
  pill: "rounded-full",
};

const badgeSize = {
  small: "px-1.5 py-0.5",
  normal: "px-2 py-1",
};

export default function Badge({ className, children, shape = "flat", border, size = "normal", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600",
        badgeShape[shape],
        badgeSize[size],
        border && "ring-1 ring-inset ring-inherit",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

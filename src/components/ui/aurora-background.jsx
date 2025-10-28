import React from "react";
import { cn } from "../../lib/utils";

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative",
        showRadialGradient && "bg-[radial-gradient(125%_125%_at_50%_10%,#1a1a1a_40%,#111827_100%)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};


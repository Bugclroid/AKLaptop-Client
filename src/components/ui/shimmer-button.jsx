import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const ShimmerButton = forwardRef(function ShimmerButton(
  {
    borderRadius = "100px",
    background = "rgba(255, 255, 255, 0.1)",
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      style={{
        "--radius": borderRadius,
        "--bg": background,
      }}
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/20 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)] backdrop-blur-md",
        "transform-gpu transition-all duration-300 ease-in-out active:translate-y-px",
        "hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-white/10",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <div
        className={cn(
          "absolute inset-0 size-full [border-radius:var(--radius)]",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0",
          "transition-opacity duration-500 ease-in-out",
          "group-hover:opacity-100"
        )}
      />
    </button>
  );
});



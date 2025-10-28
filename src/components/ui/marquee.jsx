import React, { useMemo } from "react";
import { cn } from "../../lib/utils";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  respectReducedMotion = false,
  ...props
}) {
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const shouldAnimate = respectReducedMotion ? !reducedMotion : true;
  const effectiveRepeat = shouldAnimate ? repeat : 1;
  return (
    <div
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 sm:p-3 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(effectiveRepeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              !vertical ? (shouldAnimate ? "animate-marquee flex-row" : "flex-row") : (shouldAnimate ? "animate-marquee-vertical flex-col" : "flex-col"),
              shouldAnimate && reverse && "animate-reverse",
              shouldAnimate && pauseOnHover && "pause-on-hover"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}



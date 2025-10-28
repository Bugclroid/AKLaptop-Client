import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 sm:auto-rows-[16rem] md:auto-rows-[18rem]", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-3 sm:space-y-4 rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 transition duration-300 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-1 sm:mb-2 font-sans font-bold text-neutral-700 dark:text-neutral-200 text-base sm:text-lg">{title}</div>
        <div className="font-sans text-[0.8rem] sm:text-sm font-normal text-neutral-600 dark:text-neutral-300">{description}</div>
      </div>
    </div>
  );
};



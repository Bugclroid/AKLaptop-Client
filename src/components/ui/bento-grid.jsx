import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {children}
      </div>
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={cn(
        "relative h-full flex flex-col rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-white/10 group",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        {header}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full min-h-[260px] sm:min-h-[320px]">
        {/* Title */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-xs md:text-sm lg:text-base font-bold text-white leading-tight break-words hyphens-auto">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed line-clamp-4 sm:line-clamp-5 md:line-clamp-6 group-hover:text-white transition-colors duration-200 mb-3 sm:mb-4 break-words">
            {description}
          </p>

          {/* Bottom accent */}
          <div className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};



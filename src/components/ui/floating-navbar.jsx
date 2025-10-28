import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems = [], className }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest < previous) {
      setVisible(true);
    } else if (latest > 100 && latest > previous) {
      setVisible(false);
    }
  });

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <a href="/#home" className="text-white font-semibold">AKLaptop</a>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-white/90 px-2 py-1 border border-white/20 rounded-md"
          >
            Menu
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="px-4 pb-3"
            >
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="text-white/90"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Floating Nav */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "hidden md:flex fixed top-6 inset-x-0 mx-auto z-50 w-fit items-center rounded-full border bg-white/80 px-4 py-2 shadow backdrop-blur",
            className
          )}
        >
          <div className="flex items-center gap-6 text-sm text-black">
            {navItems.map((item) => (
              <a key={item.name} href={item.link} className="hover:underline">
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};


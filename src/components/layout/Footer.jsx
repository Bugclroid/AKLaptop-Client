export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-white/60">
        © {new Date().getFullYear()} AKLaptop. All rights reserved.
      </div>
    </footer>
  );
}


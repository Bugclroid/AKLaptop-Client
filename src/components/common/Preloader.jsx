import Spinner from "./Spinner";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-sm text-white/70 tracking-wide">Loading AKLaptop…</p>
      </div>
    </div>
  );
}



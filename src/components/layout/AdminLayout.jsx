import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-b md:border-b-0 md:border-r border-white/20 bg-white/5 backdrop-blur-md px-2 py-2 md:p-4 sticky top-0 md:static z-40 shadow-lg shadow-black/20">
        <nav className="flex md:flex-col gap-1 md:gap-2 text-xs md:text-sm">
          <Link to="/admin/dashboard" className="rounded-md px-3 py-2 hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200">Dashboard</Link>
          <Link to="/admin/contacts" className="rounded-md px-3 py-2 hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200">Contacts</Link>
          <Link to="/admin/testimonials" className="rounded-md px-3 py-2 hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200">Testimonials</Link>
        </nav>
      </aside>
      <section className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_20px_40px_-20px_rgba(0,0,0,0.4)]">
          <Outlet />
        </div>
      </section>
    </div>
  );
}


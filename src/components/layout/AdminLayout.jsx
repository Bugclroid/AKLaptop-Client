import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-b md:border-b-0 md:border-r border-slate-800/60 bg-black/40 backdrop-blur px-4 py-3 md:p-4 sticky top-0 md:static z-40">
        <h2 className="font-semibold mb-3 text-slate-200">Admin</h2>
        <nav className="flex md:flex-col gap-2 text-sm">
          <Link to="/admin/dashboard" className="rounded-md px-3 py-2 hover:bg-slate-800/60 transition-colors">Dashboard</Link>
          <Link to="/admin/contacts" className="rounded-md px-3 py-2 hover:bg-slate-800/60 transition-colors">Contacts</Link>
          <Link to="/admin/testimonials" className="rounded-md px-3 py-2 hover:bg-slate-800/60 transition-colors">Testimonials</Link>
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


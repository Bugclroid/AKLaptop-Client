import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-14 md:pt-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}


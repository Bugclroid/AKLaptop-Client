import { FloatingNav } from "../ui/floating-navbar";

export default function Navbar() {
  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "Services", link: "/#services" },
    { name: "Testimonials", link: "/#testimonials" },
    { name: "Contact", link: "/contact" },
    { name: "Admin Login", link: "/admin/login" },
  ];

  return <FloatingNav navItems={navItems} />;
}


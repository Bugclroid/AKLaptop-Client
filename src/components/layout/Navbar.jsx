import { FloatingNav } from "../ui/floating-navbar";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { token } = useAuth();

  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "Services", link: "/#services" },
    { name: "Testimonials", link: "/#testimonials" },
    { name: "Contact", link: "/contact" },
    { name: token ? "Dashboard" : "Admin Login", link: token ? "/admin/dashboard" : "/admin/login" },
  ];

  return <FloatingNav navItems={navItems} />;
}


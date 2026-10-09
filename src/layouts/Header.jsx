import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { HeaderLogo } from "../components/Logo.jsx";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/blog", label: "المدونة" },
  { to: "/about", label: "من نحن" },
];

const activeLink = "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20";

function navLinkClass({ isActive }) {
  return `rounded-full px-5 py-2.5 text-sm font-bold transition lg:px-6 lg:py-3 lg:text-base ${
    isActive ? activeLink : "text-zinc-400 hover:text-white"
  }`;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function openSearch() {
    setIsMenuOpen(false);
    navigate("/blog", { state: { focusSearch: true } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#161616]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[63px] max-w-7xl items-center justify-between gap-4 px-4 sm:h-[87px] sm:px-6 lg:h-[95px]">
        <Link to="/" onClick={() => setIsMenuOpen(false)} aria-label="عدسة - الصفحة الرئيسية">
          <HeaderLogo />
        </Link>

        <nav className="hidden items-center gap-0 rounded-full border border-[#262626] p-1.5 md:flex lg:p-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-6">
          <button
            type="button"
            onClick={openSearch}
            aria-label="بحث"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:text-white md:flex"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/blog"
            className="hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110 md:block lg:px-10 lg:py-[19px]"
          >
            ابدأ القراءة
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="القائمة"
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition hover:text-white md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-white/5 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold ${isActive ? activeLink : "bg-white/5 text-zinc-300"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={openSearch}
              className="rounded-xl bg-white/5 px-4 py-3 text-start text-sm font-bold text-zinc-300"
            >
              بحث
            </button>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-center text-sm font-bold text-white"
            >
              ابدأ القراءة
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

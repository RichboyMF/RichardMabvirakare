import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { STUDENT_NAME } from "../constants";
import { SettingsIcon } from "./Icons";

const AnchorLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </a>
);

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
}> = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

export const Header: React.FC<{ onSettingsClick: () => void }> = ({
  onSettingsClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // smooth scroll only when on home route
    if (location.pathname !== "/") return;
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    if (!targetId) return;

    if (targetId === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Update URL to remove hash
      window.history.replaceState(null, "", "/");
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash to reflect current section
      window.history.replaceState(null, "", targetId);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              {STUDENT_NAME}
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isHomePage ? (
                // Home page navigation - smooth scroll to sections
                <>
                  <AnchorLink href="#home" onClick={handleNavClick}>
                    Home
                  </AnchorLink>
                  <AnchorLink href="#about" onClick={handleNavClick}>
                    About
                  </AnchorLink>
                  <AnchorLink href="#experience" onClick={handleNavClick}>
                    Experience
                  </AnchorLink>
                  <AnchorLink href="#projects" onClick={handleNavClick}>
                    Projects
                  </AnchorLink>
                  <AnchorLink href="#contact" onClick={handleNavClick}>
                    Contact
                  </AnchorLink>
                </>
              ) : (
                // Detailed page navigation - navigate between pages
                <>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/experiences">Experience</NavLink>
                  <NavLink to="/projects">Projects</NavLink>
                </>
              )}
              <button
                onClick={onSettingsClick}
                className="ml-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 p-2 rounded-full"
                aria-label="Open animation settings"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

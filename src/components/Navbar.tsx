
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(
    () => window.innerWidth > 820
  );

  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 820
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820;

      setIsMobile(mobile);
      setMenuOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    if (isMobile) setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${
        menuOpen && isMobile ? 'mobile-menu-open' : ''
      }`}
    >
      <a
        href="#home"
        className="nav-brand"
        onClick={handleNavClick}
      >
        <span className="nav-brand-mark">M</span>

        <span className="nav-brand-copy">
          MOHSIN ALI
          <small>FULL-STACK DEVELOPER</small>
        </span>
      </a>

      <nav
        id="main-navigation"
        className={`nav-links ${menuOpen ? 'active' : 'collapsed'}`}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activeSection === item.id ? 'nav-active' : ''}
            aria-current={
              activeSection === item.id ? 'page' : undefined
            }
            onClick={handleNavClick}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <a
          href="#contact"
          className="nav-cta"
          onClick={handleNavClick}
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

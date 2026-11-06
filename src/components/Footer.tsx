
import React from 'react';
import './Footer.css';
import { personalInfo } from '../data/portfolio';
import {
  Mail,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`;

  const socials = [
    {
      icon: <GitHubIcon />,
      href: personalInfo.github,
      label: 'GitHub',
      external: true,
    },
    {
      icon: <LinkedInIcon />,
      href: personalInfo.linkedin,
      label: 'LinkedIn',
      external: true,
    },
    {
      icon: <Mail size={18} />,
      href: emailLink,
      label: 'Email',
      external: true,
    },
    {
      icon: <MessageCircle size={18} />,
      href: personalInfo.whatsapp,
      label: 'WhatsApp',
      external: true,
    },
  ];

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
    className="site-footer"
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, #4f8ef7, #7c3aed, #22d3ee, transparent)',
          opacity: 0.4,
        }}
      />

      {/* Main content */}
      <div
        className="container"
        style={{
          padding: '64px clamp(20px, 5vw, 48px) 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.5rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: '#f1f5f9',
                marginBottom: '6px',
              }}
            >
              MOHSIN{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4f8ef7, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ALI
              </span>
            </div>

            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#475569',
                marginBottom: '20px',
              }}
            >
              FULL STACK DEVELOPER
            </div>

            <p
              style={{
                fontSize: '0.85rem',
                color: '#475569',
                lineHeight: '1.7',
                maxWidth: '260px',
              }}
            >
              Building modern digital experiences with passion and precision.
              Based in Pakistan, available worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: '#4f8ef7',
                marginBottom: '20px',
              }}
            >
              NAVIGATION
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <span style={{ color: '#334155' }}>→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: '#4f8ef7',
                marginBottom: '20px',
              }}
            >
              CONTACT
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <a
                href={emailLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                {personalInfo.email}
              </a>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                {personalInfo.phone}
              </a>

              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#475569',
                }}
              >
                Pakistan 🇵🇰
              </span>
            </div>
          </div>

          {/* Social */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: '#4f8ef7',
                marginBottom: '20px',
              }}
            >
              CONNECT
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  title={social.label}
                  aria-label={social.label}
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    color: '#64748b',
                    transition: 'all 0.2s ease',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = '#4f8ef7';
                    el.style.color = '#4f8ef7';
                    el.style.background = 'rgba(79, 142, 247, 0.1)';
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                    el.style.color = '#64748b';
                    el.style.background = 'rgba(255,255,255,0.02)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              color: '#334155',
              margin: 0,
            }}
          >
            © {currentYear} Mohsin Ali. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'rgba(79, 142, 247, 0.08)',
              border: '1px solid rgba(79, 142, 247, 0.2)',
              borderRadius: '8px',
              color: '#4f8ef7',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(79, 142, 247, 0.15)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(79, 142, 247, 0.08)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

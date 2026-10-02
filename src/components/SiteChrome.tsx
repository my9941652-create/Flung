import { useState } from 'react';
import { socials } from '../data/socials';

type NavProps = { navigate: (path: string) => void; currentPath: string };

export function Navbar({ navigate, currentPath }: NavProps) {
  const [open, setOpen] = useState(false);
  const go = (path: string) => { setOpen(false); navigate(path); };
  const isActive = (path: string) => path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <button className="wordmark" onClick={() => go('/')} aria-label="FLUNG home">
          <span>FLUNG</span><small>AI CREATOR LIBRARY</small>
        </button>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu">
          <span /><span />
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <button className={isActive('/') ? 'active' : ''} onClick={() => go('/')}>HOME</button>
          <button className={isActive('/prompts') ? 'active' : ''} onClick={() => go('/prompts')}>PROMPTS</button>
          <button className={isActive('/about') ? 'active' : ''} onClick={() => go('/about')}>ABOUT</button>
          <button className="nav-cta" onClick={() => go('/prompts')}>EXPLORE PROMPTS <span>↗</span></button>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ navigate }: { navigate: (path: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="eyebrow">FLUNG / AI CREATOR LIBRARY</p>
        <h2>CREATE SOMETHING<br /><em>WORTH SHARING.</em></h2>
        <button className="button button-dark" onClick={() => navigate('/prompts')}>BROWSE THE LIBRARY <span>↗</span></button>
      </div>
      <div className="footer-grid">
        <div>
          <button className="footer-wordmark" onClick={() => navigate('/')}>FLUNG</button>
          <p>AI tools, creative workflows, prompts and practical knowledge for modern creators.</p>
        </div>
        <div className="footer-links"><span className="eyebrow">NAVIGATE</span><button onClick={() => navigate('/')}>HOME</button><button onClick={() => navigate('/prompts')}>PROMPTS</button><button onClick={() => navigate('/about')}>ABOUT</button></div>
        <div className="footer-links"><span className="eyebrow">FOLLOW FLUNG</span>{socials.map((social) => <a key={social.label} href={social.href} onClick={(event) => { if (!social.available) event.preventDefault(); }} aria-disabled={!social.available}>{social.label} <span>{social.available ? '↗' : '—'}</span></a>)}</div>
      </div>
      <div className="footer-bottom"><span>© 2026 FLUNG. ALL RIGHTS RESERVED.</span><span>BUILT BY MAHENDRA YADAV.</span></div>
    </footer>
  );
}

export function SectionMarker({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow section-marker"><span className="marker-dot" />{children}</p>;
}

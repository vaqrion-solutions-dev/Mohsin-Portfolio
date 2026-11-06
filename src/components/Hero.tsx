
  import {
    ArrowDown,
    ArrowUpRight,
    Mail,
  } from 'lucide-react';

  import Scene3D from '../components/Scene3D';

  export default function Hero() {
    return (
      <section className="hero hero-reference" id="home">

        {/* Full-screen reference artwork */}
        <div className="hero-artwork" aria-hidden="true">
          <img
            src="/images/hero-reference-artwork.png"
            alt=""
            className="hero-artwork-image"
            draggable={false}
            loading="eager"
          />
        </div>

        {/* Live animated particles and 3D effects */}
        <Scene3D />

        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-glow glow-three" />

        {/* Main hero content */}
        <div className="hero-content">

          <div className="availability">
            <span className="status-dot" />
            Available for Opportunities
          </div>

          <div className="hero-intro">
            <span className="intro-line" />
            HELLO, I'M MOHSIN ALI
          </div>

          <h1>
            Crafting
            <br />
            <span className="gradient-text">Digital Worlds</span>
            <br />
            Beyond Limits<span className="hero-title-dot">.</span>
          </h1>

          <p className="hero-description">
            I'm a Full-Stack Developer focused on building immersive digital
            experiences, modern web applications and creative solutions that
            bring ideas to life.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-btn">
              Explore My Work
              <ArrowUpRight size={18} />
            </a>

            <a href="#about" className="secondary-btn">
              Discover My Journey
              <ArrowDown size={17} />
            </a>
          </div>

          {/* Social and email links */}
          <div className="hero-socials">
            <span>CONNECT WITH ME</span>

            <a
              href="mailto:mrmohsinali67@gmail.com"
              className="social-link social-email"
              aria-label="Send email"
              title="Email"
            >
              <Mail size={19} />
            </a>

            <a
              href="https://github.com/vaqrion-solutions-dev/Astronomy"
              className="social-link social-github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              GH
            </a>

            <a
              href="https://www.linkedin.com/in/mohsin-ali-662514447"
              className="social-link social-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              in
            </a>
          </div>

        </div>

        <a
          href="#about"
          className="hero-scroll"
          aria-label="Scroll to About section"
        >
          <span>SCROLL</span>
          <div>
            <ArrowDown size={15} />
          </div>
        </a>

      </section>
    );
  }

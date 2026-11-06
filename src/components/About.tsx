
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, stats } from '../data/portfolio';
import { MapPin, Code2, Layers, Zap } from 'lucide-react';
import ParticlePortrait from './ParticlePortrait';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, titleRef.current, textRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        photoRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: <Code2 size={20} />,
      title: 'Full Stack Expertise',
      desc: 'Proficient in both frontend and backend technologies, from React & Angular to Laravel, Node.js and .NET.',
      color: '#4f8ef7',
    },
    {
      icon: <Layers size={20} />,
      title: 'Clean Architecture',
      desc: 'I build scalable, maintainable codebases following modern design patterns and best practices.',
      color: '#7c3aed',
    },
    {
      icon: <Zap size={20} />,
      title: 'Performance Focused',
      desc: 'Every application I build is optimized for speed, responsiveness and excellent user experience.',
      color: '#22d3ee',
    },
    {
      icon: <MapPin size={20} />,
      title: 'Based in Pakistan',
      desc: 'Available for remote collaboration globally and local projects in Pakistan.',
      color: '#10b981',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section about-section"
    >
      <div className="about-background-glow" />

      <div className="container about-container">
        <div className="about-layout">

          {/* LEFT: PORTRAIT AND STATS */}

          <div
            ref={photoRef}
            className="about-visual"
            style={{ opacity: 0 }}
          >
            <div className="about-portrait-wrap">
              <ParticlePortrait imageSrc={personalInfo.photo} />

              <div className="about-location-badge">
                <MapPin size={14} color="#4f8ef7" />
                <span>Pakistan</span>
              </div>
            </div>

            <div
              ref={statsRef}
              className="about-stats"
              style={{ opacity: 0 }}
            >
              {stats.map((stat) => (
                <div className="about-stat-card" key={stat.label}>
                  <div className="about-stat-value">
                    {stat.value}
                  </div>

                  <div className="about-stat-label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ABOUT CONTENT */}

          <div className="about-content">

            <div
              ref={labelRef}
              className="section-label about-label"
              style={{ opacity: 0 }}
            >
              About Me
            </div>

            <h2
              ref={titleRef}
              className="section-title about-title"
              style={{ opacity: 0 }}
            >
              Building Digital Experiences{' '}
              <span className="gradient-text">
                With Purpose
              </span>
            </h2>

            <div
              ref={textRef}
              className="about-text-content"
              style={{ opacity: 0 }}
            >
              <p className="about-description">
                {personalInfo.bio}
              </p>

              <p className="about-description about-description-secondary">
                My development journey spans across multiple domains — from
                crafting intuitive user interfaces to architecting robust
                backend systems. I thrive on challenges that require both
                technical depth and creative thinking.
              </p>

              {/* HIGHLIGHT CARDS */}

              <div
                ref={cardsRef}
                className="about-highlights"
              >
                {highlights.map((item) => (
                  <div
                    className="about-highlight-card"
                    key={item.title}
                    style={{
                      '--highlight-color': item.color,
                      opacity: 0,
                    } as React.CSSProperties}
                  >
                    <div className="about-highlight-icon">
                      {item.icon}
                    </div>

                    <div className="about-highlight-title">
                      {item.title}
                    </div>

                    <div className="about-highlight-description">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA BUTTONS */}

              <div className="about-actions">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View GitHub
                </a>

                <a
                  href={personalInfo.emailUrl}
                  className="btn-secondary"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

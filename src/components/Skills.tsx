
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// SKILL ICON MAP
// ==========================================

const getSkillIcon = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    jquery: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
    react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    csharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    dotnet: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    sqlserver: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  };

  return iconMap[iconKey] || '';
};

// ==========================================
// SKILL CARD
// ==========================================

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="skill-card"
      style={{ '--skill-color': skill.color } as React.CSSProperties}
    >
      <div className="skill-icon-wrap">
        {getSkillIcon(skill.icon) && !imageError ? (
          <img
            src={getSkillIcon(skill.icon)}
            alt={skill.name}
            className={`skill-icon ${skill.icon === 'express' ? 'skill-icon-express' : ''}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="skill-icon-fallback">
            {skill.name.charAt(0)}
          </div>
        )}
      </div>

      <span className="skill-name">
        {skill.name}
      </span>

      <div className="skill-color-indicator" />
    </div>
  );
};

// ==========================================
// SKILLS SECTION
// ==========================================

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<
    'frontend' | 'backend' | 'database'
  >('frontend');

  const tabs = [
    {
      key: 'frontend' as const,
      label: 'Frontend',
      count: skills.frontend.length,
    },
    {
      key: 'backend' as const,
      label: 'Backend',
      count: skills.backend.length,
    },
    {
      key: 'database' as const,
      label: 'Database',
      count: skills.database.length,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentSkills = skills[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section skills-section"
    >
      <div className="skills-background-glow" />

      <div className="container skills-container">

        {/* HEADER */}

        <div ref={headerRef} className="skills-header">
          <div className="section-label skills-label">
            Technical Skills
          </div>

          <h2 className="section-title skills-title">
            My Tech <span className="gradient-text">Stack</span>
          </h2>

          <p className="section-desc skills-description">
            A curated set of technologies I use to build full-stack
            applications — from interactive frontends to scalable
            backend systems and databases.
          </p>
        </div>

        {/* CATEGORY TABS */}

        <div className="skills-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`skills-tab ${activeTab === tab.key ? 'active' : ''}`}
              aria-pressed={activeTab === tab.key}
            >
              <span>{tab.label}</span>

              <span className="skills-tab-count">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* SKILLS GRID */}

        <div className="skills-grid" key={activeTab}>
          {currentSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
            />
          ))}
        </div>

        {/* BOTTOM BANNER */}

        <div className="skills-bottom-banner">
          <p>
            I continuously expand my skill set. Currently exploring{' '}
            <span className="exploring-docker">Docker</span>,{' '}
            <span className="exploring-aws">AWS</span> and{' '}
            <span className="exploring-next">Next.js</span> to stay
            aligned with industry best practices.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Skills;

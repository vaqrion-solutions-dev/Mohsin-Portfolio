
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { ExternalLink } from 'lucide-react';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`project-card ${isActive ? 'active' : ''} ${hovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      style={{
        '--project-color': project.color,
        '--project-gradient-from': project.gradientFrom,
        '--project-gradient-to': project.gradientTo,
      } as React.CSSProperties}
    >
      <div className="project-card-top">
        <div className="project-icon">
          {project.icon}
        </div>

        <span className="project-category">
          {project.category}
        </span>
      </div>

      <h3 className="project-title">
        {project.title}
      </h3>

      <div className={`project-details ${isActive ? 'visible' : ''}`}>
        <p className="project-description">
          {project.description}
        </p>

        <div className="project-highlights">
          {project.highlights.map((highlight) => (
            <span key={highlight} className="project-highlight">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="project-tech-list">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="project-tech">
            {tech}
          </span>
        ))}

        {project.tech.length > 4 && (
          <span className="project-tech-more">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState(0);
  const [filter, setFilter] = useState('all');

  const categories = [
    'all',
    'Full Stack',
    'Frontend / Data',
    'Mobile / Web',
    'Open Source',
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);

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

      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section projects-section"
    >
      <div className="projects-background-glow" />

      <div className="container projects-container">
        <div ref={headerRef} className="projects-header">
          <div className="section-label">
            Featured Projects
          </div>

          <div className="projects-heading-row">
            <div className="projects-heading-content">
              <h2 className="section-title">
                Work I'm{' '}
                <span className="gradient-text-purple">
                  Proud Of
                </span>
              </h2>

              <p className="section-desc">
                A selection of projects that demonstrate my full-stack
                development capabilities across various domains and
                technology stacks.
              </p>
            </div>

            <a
              href="https://github.com/vaqrion-solutions-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="projects-github-link"
            >
              <ExternalLink size={16} />
              View All on GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="projects-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setFilter(category);
                setActiveProject(0);
              }}
              className={`projects-filter ${filter === category ? 'active' : ''}`}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="projects-grid"
          key={filter}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeProject === index}
              onClick={() =>
                setActiveProject(activeProject === index ? -1 : index)
              }
            />
          ))}
        </div>

        <div className="featured-repo">
          <div className="featured-repo-content">
            <div className="featured-repo-label">
              FEATURED OPEN SOURCE
            </div>

            <h3 className="featured-repo-title">
              🌌 Astronomy Explorer
            </h3>

            <p className="featured-repo-description">
              An interactive space exploration project featuring 3D
              celestial visualizations and educational astronomy resources.
            </p>
          </div>

          <a
            href="https://github.com/vaqrion-solutions-dev/Astronomy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary featured-repo-button"
          >
            <ExternalLink size={17} />
            View Repository
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

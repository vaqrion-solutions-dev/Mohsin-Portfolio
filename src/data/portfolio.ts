// ==========================================================
// PORTFOLIO DATA - MOHSIN ALI
// ==========================================================

export const personalInfo = {
  name: 'Mohsin Ali',
  title: 'Full Stack Developer',
  subtitle: 'Building modern digital experiences',
  experience: '2+',
  location: 'Pakistan',
  email: 'mrmohsinali67@gmail.com',
  emailUrl: 'mailto:mrmohsinali67@gmail.com',
  phone: '+92 308 5938317',
  whatsapp: 'https://wa.me/923085938317',
  github: 'https://github.com/vaqrion-solutions-dev',
  linkedin: 'https://www.linkedin.com/in/mohsin-ali-662514447',
  featuredRepo: 'https://github.com/vaqrion-solutions-dev/Astronomy',
  photo: '/images/mohsin.png',
  bio: "Hi, I'm Mohsin Ali, a Full Stack Developer with 2+ years of experience building modern, responsive and user-focused web applications. I enjoy transforming ideas into functional digital experiences through clean code, creative problem-solving and modern web technologies.",
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const skills = {
  frontend: [
    { name: 'HTML5', icon: 'html5', color: '#E44D26' },
    { name: 'CSS3', icon: 'css3', color: '#1572B6' },
    { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    { name: 'Bootstrap', icon: 'bootstrap', color: '#7952B3' },
    { name: 'jQuery', icon: 'jquery', color: '#0769AD' },
    { name: 'React.js', icon: 'react', color: '#61DAFB' },
    { name: 'Angular', icon: 'angular', color: '#DD0031' },
  ],
  backend: [
    { name: 'PHP', icon: 'php', color: '#777BB4' },
    { name: 'Laravel', icon: 'laravel', color: '#FF2D20' },
    { name: 'Node.js', icon: 'nodejs', color: '#339933' },
    { name: 'Express.js', icon: 'express', color: '#000000' },
    { name: 'C#', icon: 'csharp', color: '#239120' },
    { name: '.NET', icon: 'dotnet', color: '#512BD4' },
  ],
  database: [
    { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
    { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
    { name: 'SQL Server', icon: 'sqlserver', color: '#CC2927' },
  ],
};

export const projects = [
  {
    id: 1,
    title: 'NOVA E-Commerce Platform',
    shortTitle: 'NOVA',
    category: 'Full Stack',
    description:
      'A modern e-commerce platform focused on seamless shopping experiences, inventory management, secure checkout and administrative controls. Built with a performance-first mindset and scalable architecture.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe'],
    color: '#4f8ef7',
    gradientFrom: '#4f8ef7',
    gradientTo: '#22d3ee',
    github: 'https://github.com/vaqrion-solutions-dev',
    featured: true,
    icon: '🛒',
    highlights: ['Secure Checkout', 'Inventory Management', 'Admin Panel', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'PULSE Analytics Dashboard',
    shortTitle: 'PULSE',
    category: 'Frontend / Data',
    description:
      'A modern analytics dashboard featuring data visualization, interactive charts, team workspaces and role-based access. Delivers real-time insights with an intuitive and clean interface.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Laravel', 'MySQL'],
    color: '#7c3aed',
    gradientFrom: '#7c3aed',
    gradientTo: '#4f8ef7',
    github: 'https://github.com/vaqrion-solutions-dev',
    featured: true,
    icon: '📊',
    highlights: ['Real-time Charts', 'Role-Based Access', 'Team Workspaces', 'Exportable Reports'],
  },
  {
    id: 3,
    title: 'ORBIT School ERP',
    shortTitle: 'ORBIT',
    category: 'Full Stack',
    description:
      'A school management platform designed to simplify student admissions, attendance, fee management and academic reporting. Streamlines administrative workflows for educational institutions.',
    tech: ['Angular', '.NET', 'SQL Server', 'C#', 'Bootstrap'],
    color: '#10b981',
    gradientFrom: '#10b981',
    gradientTo: '#22d3ee',
    github: 'https://github.com/vaqrion-solutions-dev',
    featured: true,
    icon: '🏫',
    highlights: ['Admissions', 'Attendance Tracking', 'Fee Management', 'Academic Reports'],
  },
  {
    id: 4,
    title: 'FITRACK Fitness App',
    shortTitle: 'FITRACK',
    category: 'Mobile / Web',
    description:
      'A fitness application featuring workout planning, progress tracking and personalized reminders. Helps users stay consistent with their fitness goals through smart scheduling and analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    github: 'https://github.com/vaqrion-solutions-dev',
    featured: false,
    icon: '💪',
    highlights: ['Workout Planning', 'Progress Tracking', 'Personalized Reminders', 'Analytics'],
  },
  {
    id: 5,
    title: 'Astronomy Explorer',
    shortTitle: 'ASTRONOMY',
    category: 'Open Source',
    description:
      'An open-source astronomy exploration project featuring interactive space visualizations, celestial data and educational resources about our universe.',
    tech: ['JavaScript', 'Three.js', 'HTML5', 'CSS3'],
    color: '#22d3ee',
    gradientFrom: '#22d3ee',
    gradientTo: '#7c3aed',
    github: 'https://github.com/vaqrion-solutions-dev/Astronomy',
    featured: false,
    icon: '🌌',
    highlights: ['Interactive Visualizations', 'Celestial Data', 'Educational', 'Open Source'],
  },
];

export const approach = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description:
      'I begin by understanding the core requirements, user needs and technical constraints. Careful planning ensures the right architecture is chosen before a single line of code is written.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Clean Architecture',
    description:
      'I structure projects with modularity, scalability and maintainability in mind. Clean code principles and design patterns ensure the codebase remains readable and extensible.',
    icon: '🏗️',
  },
  {
    number: '03',
    title: 'Iterative Development',
    description:
      'Working in focused sprints, I build features incrementally, test continuously and gather feedback early. This approach reduces risk and ensures the product evolves in the right direction.',
    icon: '🔄',
  },
  {
    number: '04',
    title: 'Performance & Quality',
    description:
      'Every deliverable is optimized for speed, accessibility and reliability. I consider performance from the ground up rather than treating it as an afterthought.',
    icon: '⚡',
  },
];

export const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Completed' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'Commitment' },
];

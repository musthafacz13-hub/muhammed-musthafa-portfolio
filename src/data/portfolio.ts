export type LinkValue = string | null;

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  screenshot: string | null;
  liveUrl: LinkValue;
  githubUrl: LinkValue;
};

export type Contact = {
  email: LinkValue;
  github: LinkValue;
  linkedin: LinkValue;
};

export const portfolio = {
  name: 'Muhammed Musthafa',
  role: 'AI Full-Stack Developer',
  location: 'Kerala, India',
  availability: 'Open to Entry-Level Opportunities',
  heroDescription:
    'I’m Muhammed Musthafa — an aspiring AI Full-Stack Developer who enjoys solving problems and building websites and Android applications with AI-assisted development.',
  about: [
    'I’m a student from Kerala with a strong interest in technology and product development.',
    'I enjoy taking an idea, understanding the problem behind it, and turning it into a working digital product.',
    'I use AI-assisted development alongside modern technologies to build websites and Android applications. My journey is driven by curiosity, practical experimentation, and a desire to become a better developer with every project.',
    'I’m currently learning, building, and looking for an opportunity to contribute to a real development team.'
  ],
  focusAreas: [
    {
      index: '01',
      title: 'Problem Solving',
      description: 'Understanding the real problem first, then working toward a useful, practical solution.'
    },
    {
      index: '02',
      title: 'AI-Assisted Development',
      description: 'Using AI thoughtfully to explore, build, debug, and move ideas forward faster.'
    },
    {
      index: '03',
      title: 'Continuous Learning',
      description: 'Staying curious, experimenting often, and improving through every project.'
    }
  ],
  skills: [
    {
      title: 'Frontend Development',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS']
    },
    {
      title: 'Backend & Database',
      items: ['Node.js', 'Supabase', 'PostgreSQL']
    },
    {
      title: 'AI-Assisted Development',
      items: ['Google AI Studio', 'Claude', 'AI-assisted coding workflows', 'Prompt engineering']
    },
    {
      title: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel']
    },
    {
      title: 'Mobile Development',
      items: ['Android application development', 'AI-assisted mobile development']
    }
  ] satisfies SkillGroup[],
  projects: [] as Project[],
  journey: [
    'Started exploring technology and software development.',
    'Began learning modern web technologies.',
    'Started experimenting with AI-assisted development.',
    'Building independent digital projects.',
    'Currently learning and looking for entry-level opportunities.'
  ],
  contact: {
    email: null,
    github: null,
    linkedin: null
  } satisfies Contact
} as const;

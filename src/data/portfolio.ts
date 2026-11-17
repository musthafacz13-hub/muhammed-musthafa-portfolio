export type LinkValue = string | null;

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Capability = {
  index: string;
  title: string;
  description: string;
};

export type SpeakingEvent = {
  date: string;
  title: string;
  venue: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  problemSolved: string;
  stack: string[];
  features: string[];
  screenshot: string | null;
  liveUrl: LinkValue;
  githubUrl: LinkValue;
};

export type Article = {
  date: string;
  title: string;
  description: string;
  url: string;
};

export type Contact = {
  email: LinkValue;
  github: LinkValue;
  linkedin: LinkValue;
  location: string;
  collaboration: string;
};

export const portfolio = {
  greeting: 'Hello, I’m',
  name: 'Muhammed Musthafa',
  role: 'AI Full-Stack Developer',
  location: 'Kerala, India',
  availability: 'Open to Entry-Level Opportunities',
  resumeUrl: null as LinkValue,
  heroDescription:
    'An aspiring AI Full-Stack Developer from Kerala, India, building websites and Android applications through practical, AI-assisted development.',
  about: {
    subsectionTitle: 'Who I Am',
    paragraphs: [
      'I’m a student and aspiring developer from Kerala, India, with a strong interest in technology, software development, and turning practical ideas into working digital products.',
      'When approaching a new idea, I focus on understanding the problem first before deciding how to build the solution. Over time, I have worked on independent digital projects across both web and Android development.',
      'I combine modern development tools with AI-assisted development workflows to explore solutions, build features, debug issues, and improve the quality of my work. My learning journey is continuous—shaped by curiosity, hands-on experimentation, and a goal to contribute meaningfully to a real development team.'
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
    ]
  },
  skills: [
    {
      title: 'Frontend Development',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS']
    },
    {
      title: 'Backend Development',
      items: ['Node.js', 'Supabase']
    },
    {
      title: 'Database Technologies',
      items: ['PostgreSQL', 'Supabase']
    },
    {
      title: 'AI-Assisted Development',
      items: ['Google AI Studio', 'Claude', 'AI-assisted coding workflows', 'Prompt engineering']
    },
    {
      title: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'HTML', 'CSS']
    },
    {
      title: 'Development Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel']
    },
    {
      title: 'Mobile Development',
      items: ['Android application development', 'AI-assisted mobile development']
    }
  ] satisfies SkillGroup[],
  capabilities: [
    {
      index: '01',
      title: 'Full-Stack Web Development',
      description:
        'Building complete web applications from interface to data layer using React, TypeScript, Node.js, Supabase, and PostgreSQL.'
    },
    {
      index: '02',
      title: 'AI-Assisted Application Development',
      description:
        'Using Google AI Studio, Claude, and structured prompt engineering to prototype, iterate, and debug software workflows efficiently.'
    },
    {
      index: '03',
      title: 'Frontend Development',
      description:
        'Creating clean, responsive, and accessible user interfaces with HTML, CSS, JavaScript, TypeScript, React, and Tailwind CSS.'
    },
    {
      index: '04',
      title: 'Android Application Development',
      description:
        'Developing practical Android applications through hands-on experimentation and AI-assisted mobile development workflows.'
    },
    {
      index: '05',
      title: 'Problem Solving',
      description:
        'Breaking down product ideas into clear user problems and building straightforward, maintainable digital solutions.'
    }
  ] satisfies Capability[],
  speakingEvents: [] as SpeakingEvent[],
  projects: [] as Project[],
  articles: [] as Article[],
  contact: {
    subsectionTitle: 'Let’s Talk',
    introduction:
      'I’m always interested in connecting with developers, teams, and people building thoughtful products.',
    collaboration:
      'Open to entry-level developer opportunities, internships, and collaborative web or Android projects.',
    location: 'Kerala, India',
    email: null,
    github: null,
    linkedin: null
  } satisfies Contact & { subsectionTitle: string; introduction: string }
} as const;

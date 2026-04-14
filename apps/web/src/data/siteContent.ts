import type {Project, Member, SocialLinks} from './types'

export type HomeSeoContent = {
  title: string;
  description: string;
  author: string;
  robots: string;
  canonicalPath: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    urlPath?: string;
    image?: string;
    imageAlt?: string;
    siteName?: string;
    locale?: string;
  };
};

export const homeSeoContent: HomeSeoContent = {
  title: 'Lyrinth Homepage',
  description: 'Official homepage of Lyrinth with project highlights, team information, and quick access to our platforms.',
  author: 'Lyrinth Team',
  robots: 'index,follow',
  canonicalPath: '/',
  openGraph: {
    title: 'Lyrinth Homepage',
    description: 'Official homepage of Lyrinth with project highlights, team information, and quick access to our platforms.',
    type: 'website',
    urlPath: '/',
    siteName: 'Lyrinth',
    locale: 'vi_VN',
  },
};

export const teamSocials: SocialLinks = {
  facebook: '',
  instagram: '',
  github: '',
  linkedin: '',
  youtube: '',
  x: '',
  discord: '',
};

// Time string format: "YYYY-MM-DDTHH:mm:ss"
export const projects: Project[] = [
  {
    title: 'Lyrinth Chatbot',
    description: 'My first-year project: a multi-functional chatbot with local tool-calling, capable of searching, generating quizzes, and more.',
    technicalStack: ['Python','FastAPI', 'Node','Express', 'Java', 'Spring', 'MongoDB', 'HTML', 'CSS', 'JavaScript','Vite'],
    author: ['NgoQAnh'],
    initialRelease: '2025-04-01T00:00:00',
    lastUpdated: '2025-10-01T00:00:00',
    link: '',
    style: '',
    bgUrl: '',
    redirectURL: 'https://chat.lyrinth.com',
    redirectText: 'Try lyrinth'
  },
  {
    title: 'Social Media Platform',
    imgUrl: '',
    description: 'A social media platform built as a second-year project, featuring user profiles, posts, comments, and real-time interactions.',
    technicalStack: ['Node','Express','Nginx', 'React', 'Vite', 'HTML', 'CSS', 'JavaScript','MongoDB','PostgreSQL','Redis'],
    author: ['NgoQAnh', 'Mrce'],
    initialRelease: '2026-04-12T00:00:00',
    lastUpdated: '2026-10-01T00:00:00',
    link: '',
    style: '',
    bgUrl: '',
    redirectURL: '',
    redirectText: ''
  },
  {
    title: 'Lyrinth Platform',
    author: ['NgoQAnh'],
    description: 'A multi-project portfolio platform featuring subdomain-based routing, dynamic content rendering, and real-time API integrations.',
    technicalStack: ['Node', 'Express', 'React', 'Vite', 'HTML', 'CSS', 'JavaScript'],
    initialRelease: '2026-04-01T00:00:00',
    lastUpdated: '2026-04-12T00:00:00',
    link: '',
    style: '',
    bgUrl: ''
  },
  {
    title: 'Minecraft - SMP Server',
    imgUrl: 'https://i.redd.it/variations-to-the-minecraft-logo-v0-0dzqovtefeqd1.png?width=1218&format=png&auto=webp&s=4e7beefe76053942332e5c9f4c4f71671f97e63e',
    author: ['NgoQAnh', 'Mrce', 'OmegaC'],
    description: 'A custom Minecraft Survival Multiplayer (SMP) server with our own plugins, custom gameplay mechanics, and various content.',
    technicalStack: ['Minecraft', 'Java', 'MySQL'],
    initialRelease: '2026-02-01T00:00:00',
    lastUpdated: '2026-04-01T00:00:00',
    //link: '/projects/mc-server',
    link: 'https://smp.lyrinth.com',
    style: '',
    bgUrl: ''
  },
  {
    title: 'Minecraft - Minigames Server',
    imgUrl: 'https://i.redd.it/variations-to-the-minecraft-logo-v0-0dzqovtefeqd1.png?width=1218&format=png&auto=webp&s=4e7beefe76053942332e5c9f4c4f71671f97e63e',
    author: ['NgoQAnh', 'Mrce', 'OmegaC'],
    description: 'A custom Minecraft Minigames server with our own plugins, featuring various minigames and custom gameplay mechanics.',
    technicalStack: ['Minecraft', 'Java', 'MySQL'],
    initialRelease: '2026-03-15T00:00:00',
    lastUpdated: '2026-04-01T00:00:00',
    //link: '/projects/mc-minigames-server',
    link: 'https://minigames.lyrinth.com',
    style: '',
    bgUrl: ''
  },
];

export const members: Member[] = [
  {
    name: 'NgoQAnh',
    link: '',
    avatarUrl: 'https://avatars.githubusercontent.com/u/140035914?s=512&v=4',
    school: 'Hanoi University of Science',
    techStack: ['Python','Java','HTML','CSS','JavaScript', 'React', 'Node.js','MERN Stack'],
    location: 'Ha Noi, Vietnam',
    accentColor: '#00ffd7',
    socials: {
      facebook: 'https://facebook.com/nqanh2k6',
      github: 'https://github.com/QAnhVN2333',
    },
  },

];

export const socialPlatforms: Array<keyof SocialLinks> = ['facebook', 'instagram', 'github', 'linkedin', 'x', 'youtube', 'discord'];
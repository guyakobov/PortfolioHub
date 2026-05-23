import { Project } from './types';

const realEstateCrmSearchImage = new URL('./assets/real-estate-crm-search.png', import.meta.url).href;

export const projects: Project[] = [
  {
    id: 'tech-knowledge-share',
    title: 'Tech Knowledge Share',
    description: 'A platform designed for developers to share technical articles, tutorials, and insights. Features a modern UI and fast content delivery.',
    url: 'https://tech-knowledge-share.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 'mama-link',
    title: 'Mama Link',
    description: 'A community-driven application connecting mothers, providing resources, support networks, and local activities tailored for families.',
    url: 'https://mama-link.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Community', 'Web App', 'Responsive'],
  },
  {
    id: 'aiverse',
    title: 'Aiverse',
    description: 'An AI-focused platform that aggregats tools, models, and community discussions. A sleek, tech-forward interface for the future.',
    url: 'https://www.aiverse.site/',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI', 'Platform', 'Modern UI'],
  },
  {
    id: 'real-estate-crm-search',
    title: 'Real Estate CRM Property Search',
    description: 'A private real-estate search tool built on CRM data, helping agents filter properties by location, price, rooms, status, and map clusters.',
    imageUrl: realEstateCrmSearchImage,
    tags: ['Private', 'Real Estate', 'CRM Search', 'Map UI'],
    isPrivate: true,
  }
];

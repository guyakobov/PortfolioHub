import { Project } from './types';

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
    id: 'company-dashboard',
    title: 'Enterprise Analytics Dashboard',
    description: 'A comprehensive internal tool built for a private client to track KPIs, financial metrics, and user growth across multiple quarters.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['Private', 'Enterprise', 'Data Viz'],
    isPrivate: true,
  },
  {
    id: 'company-ecommerce',
    title: 'B2B E-Commerce Portal',
    description: 'A high-throughput ordering system designed for wholesale clients, featuring complex pricing matrices and inventory sync.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Private', 'E-Commerce', 'B2B'],
    isPrivate: true,
  }
];

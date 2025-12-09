// Navigation links used across the site
import { NavLink } from '@/types';

export const navigationLinks: NavLink[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/contact',
    label: 'Contact',
    isButton: true,
  },
];


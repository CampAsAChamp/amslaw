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
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
    isButton: true,
  },
];


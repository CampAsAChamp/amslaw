// Navigation links used across the site
export interface NavLink {
  href: string;
  label: string;
  isButton?: boolean; // Used to style the Contact link as a button
}

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


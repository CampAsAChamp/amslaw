// Contact page content and data

import { ContactInfo, OfficeHours } from '@/types';

export const whatToExpect = [
  "Review & discuss your assets and estate planning goals",
  "Discussion of your family situation and concerns",
  "Explanation of available options",
];

export const officeHours: OfficeHours[] = [
  {
    days: "Monday - Friday",
    hours: "9:00 AM - 4:00 PM",
  },
  {
    days: "Saturday - Sunday",
    hours: "Closed",
  },
];

// Centralized contact information - single source of truth
// Use formatPhoneNumber() from @/utils to format the phone for display
// Use formatAddressSingleLine() or formatAddressMultiLine() from @/utils to format address
export const contactInfo: ContactInfo = {
  phone: "3107927454", // Raw phone number (use formatPhoneNumber() for display)
  email: "amschneiderlaw@gmail.com",
  address: {
    street: "21250 Hawthorne Blvd.",
    suite: "Suite 500",
    city: "Torrance",
    state: "CA",
    zip: "90503",
  },
  maps: {
    // Google Maps link for clicking
    link: "https://www.google.com/maps/place/21250+Hawthorne+Blvd,+Torrance,+CA+90503/@33.8361803,-118.353406,18.81z/data=!4m6!3m5!1s0x80c2b4d35aa9c9b3:0x9718c991148def10!8m2!3d33.8361935!4d-118.3526581!16s%2Fg%2F11bw3fbbpr?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
    // Google Maps embed URL for iframe
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.0741686115725!2d-118.35752901472449!3d33.836197860121175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b4d35aa9c9b3%3A0x9718c991148def10!2s21250%20Hawthorne%20Blvd%2C%20Torrance%2C%20CA%2090503!5e0!3m2!1sen!2sus!4v1764539776078!5m2!1sen!2sus",
  },
};


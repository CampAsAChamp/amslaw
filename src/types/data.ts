// Data types for application models

export interface Address {
  street: string
  suite: string
  city: string
  state: string
  zip: string
}

export interface OfficeHours {
  days: string
  hours: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: Address
  maps: {
    link: string
    embed: string
  }
}

export interface NavLink {
  href: string
  label: string
  isButton?: boolean // Used to style the Contact link as a button
}

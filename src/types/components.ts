// Component prop types for all shared components

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features?: string[]
  sections?: {
    heading?: string
    items: (string | React.ReactNode)[]
  }[]
  delay?: number
  animateOnMount?: boolean
}

export interface IconCardProps {
  icon: React.ReactNode
  title: string
  description: string
  stepNumber?: number
  showArrow?: boolean
  delay?: number
}

export interface StatsCardProps {
  number: string
  label: string
}

export interface HeroSectionProps {
  title: string
  subtitle: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundClass?: string
  showLogo?: boolean
}

export interface CallToActionProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  backgroundClass?: string
}

export interface SectionHeaderProps {
  title: string
  subtitle: string
  className?: string
  delay?: number
}

export interface ContactFormProps {
  onSubmit?: (data: FormData) => void
}

export interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  preferredContact: string
}

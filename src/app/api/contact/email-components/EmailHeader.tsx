import { Section, Heading } from "@react-email/components"
import { emailStyles } from "./styles"

interface EmailHeaderProps {
  title: string
}

export function EmailHeader({ title }: EmailHeaderProps) {
  return (
    <Section style={emailStyles.header}>
      <Heading style={emailStyles.headerTitle}>{title}</Heading>
    </Section>
  )
}

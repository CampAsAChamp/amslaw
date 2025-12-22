import { Text, Link } from "@react-email/components"
import { emailStyles } from "./styles"

interface EmailFieldProps {
  label: string
  value: string
  href?: string
  isMessage?: boolean
}

export function EmailField({ label, value, href, isMessage = false }: EmailFieldProps) {
  return (
    <div style={emailStyles.field}>
      <Text style={emailStyles.label}>{label}</Text>
      <Text style={isMessage ? emailStyles.message : emailStyles.value}>
        {href ? (
          <Link href={href} style={emailStyles.link}>
            {value}
          </Link>
        ) : (
          value
        )}
      </Text>
    </div>
  )
}

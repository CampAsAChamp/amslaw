import { Text, Hr } from "@react-email/components"
import { emailStyles } from "./styles"

interface EmailFooterProps {
  timestamp?: string
}

export function EmailFooter({ timestamp }: EmailFooterProps) {
  const displayTime = timestamp || new Date().toLocaleString()

  return (
    <>
      <Hr style={emailStyles.hr} />
      <Text style={emailStyles.footer}>Sent from AMS Law contact form at {displayTime}</Text>
    </>
  )
}

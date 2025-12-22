// Shared styles for email components
export const emailStyles = {
  body: {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#333",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    backgroundColor: "#00AEEF",
    color: "white",
    padding: "20px",
    borderRadius: "5px 5px 0 0",
  },
  headerTitle: {
    margin: "0",
    color: "white",
    fontSize: "24px",
  },
  content: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    border: "1px solid #e5e7eb",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
    margin: "0 0 5px 0",
  },
  value: {
    color: "#111827",
    margin: "0",
  },
  message: {
    color: "#111827",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
  },
  link: {
    color: "#00AEEF",
    textDecoration: "none",
  },
  hr: {
    marginTop: "20px",
    marginBottom: "20px",
    borderTop: "1px solid #e5e7eb",
  },
  footer: {
    fontSize: "12px",
    color: "#6b7280",
    margin: "0",
  },
} as const

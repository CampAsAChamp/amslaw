"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { ContactFormProps, FormData } from "@/types"
import toast, { Toaster } from "react-hot-toast"
import { motion } from "framer-motion"
import FormField from "@/app/components/ui/FormField"

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const cardVariants = {
    initial: {
      scaleX: 0.05,
      scaleY: 0.05,
      opacity: 0,
    },
    animate: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    },
  }

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Send email via API route
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to send message")
        }
      }
      setSubmitStatus("success")
      toast.success("Email sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        preferredContact: "",
      })
    } catch {
      setSubmitStatus("error")
      toast.error("Failed to send message. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--bg-surface)",
            color: "var(--text-body)",
            borderRadius: "var(--border-radius-lg)",
            boxShadow: "var(--shadow-xl)",
            padding: "16px 24px",
            fontSize: "16px",
            fontWeight: "500",
            maxWidth: "500px",
          },
          success: {
            style: {
              background: "#10b981",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "#10b981",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "#ef4444",
            },
          },
        }}
      />
      <motion.div
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
          delay: 0.1,
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
        >
          <h2 className="text-2xl font-bold text-heading mb-6">Contact</h2>

          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Email sent successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              There was an error sending your message. Please try again or call us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="name"
              name="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />

            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />

            <FormField
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />

            <FormField
              id="subject"
              name="subject"
              label="Subject"
              type="select"
              value={formData.subject}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select a subject" },
                { value: "wills", label: "Wills & Testaments" },
                { value: "trusts", label: "Trust Planning" },
                { value: "probate", label: "Probate & Administration" },
                {
                  value: "estate-planning",
                  label: "Comprehensive Estate Planning",
                },
                { value: "general", label: "General Inquiry" },
                { value: "other", label: "Other" },
              ]}
            />

            <FormField
              id="preferredContact"
              name="preferredContact"
              label="Preferred Contact Method"
              type="select"
              value={formData.preferredContact}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select a contact method" },
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "either", label: "Either Email or Phone" },
              ]}
            />

            <FormField
              id="message"
              name="message"
              label="Message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Please describe your estate planning needs or any questions you have..."
              rows={5}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-on-primary py-3 px-6 rounded-md font-semibold hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
}

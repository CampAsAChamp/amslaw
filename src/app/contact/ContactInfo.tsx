"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import { CopyButton } from "@/app/components/ui"
import { icons, whatToExpect, officeHours, contactInfo } from "@/app/data"
import { formatPhoneNumber, formatAddressMultiLine } from "@/utils"

export default function ContactInfo() {
  const addressLines = formatAddressMultiLine(contactInfo.address)

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

  return (
    <div className="space-y-8">
      <motion.div
        key="office-info"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            delay: 0.5,
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">Office Information</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-primary-hover mt-1 mr-3" />
              <div>
                <div className="font-semibold text-heading">Address</div>
                <a
                  href={contactInfo.maps.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body hover:text-primary-hover transition-colors hover:underline"
                >
                  {addressLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < addressLines.length - 1 && (
                        <>
                          <br />
                        </>
                      )}
                    </span>
                  ))}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-primary-hover mt-1 mr-3" />
              <div>
                <div className="font-semibold text-heading">Phone</div>
                <div className="text-body flex items-center gap-2">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-primary-hover transition-colors hover:underline"
                  >
                    {formatPhoneNumber(contactInfo.phone)}
                  </a>
                  <CopyButton
                    textToCopy={formatPhoneNumber(contactInfo.phone)}
                    label="Copy phone number"
                    className="text-primary-hover hover:text-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-6 h-6 text-primary-hover mt-1 mr-3" />
              <div>
                <div className="font-semibold text-heading">Email</div>
                <div className="text-body flex items-center gap-2">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-primary-hover transition-colors hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                  <CopyButton
                    textToCopy={contactInfo.email}
                    label="Copy email address"
                    className="text-primary-hover hover:text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        key="office-hours"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
          delay: 0.3,
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            delay: 0.6,
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">Office Hours</h3>
          <div className="space-y-2 text-body">
            {officeHours.map((schedule, index) => (
              <div key={index} className="flex justify-between">
                <span>{schedule.days}</span>
                <span>{schedule.hours}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        key="what-to-expect"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
          delay: 0.4,
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            delay: 0.7,
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">What to Expect</h3>
          <ul className="space-y-3 text-body">
            {whatToExpect.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5">{icons.checkmarkSmall}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}

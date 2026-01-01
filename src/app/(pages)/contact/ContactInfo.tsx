"use client"

import { Check, Mail, MapPin, Phone } from "lucide-react"

import { formatAddressMultiLine, formatPhoneNumber } from "@/utils"
import { AnimatedContainer, CopyButton } from "@/app/components/common"
import AddressDisplay from "@/app/components/common/AddressDisplay"
import { contactInfo, officeHours, whatToExpect } from "@/app/data"

export default function ContactInfo() {
  const addressLines = formatAddressMultiLine(contactInfo.address)

  return (
    <div className="space-y-8">
      <AnimatedContainer delay={0.2} animateOnMount={true}>
        <h3 className="text-xl font-bold text-heading mb-6">Office Information</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-primary-hover mt-1 mr-6" />
            <div>
              <div className="font-semibold text-heading">Address</div>
              <AddressDisplay
                addressLines={addressLines}
                link={contactInfo.maps.link}
                className="text-body hover:text-primary-hover transition-colors hover:underline"
              />
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="w-6 h-6 text-primary-hover mt-1 mr-6" />
            <div>
              <div className="font-semibold text-heading">Phone</div>
              <div className="text-body flex items-center gap-2">
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary-hover transition-colors hover:underline">
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
            <Mail className="w-6 h-6 text-primary-hover mt-1 mr-6" />
            <div>
              <div className="font-semibold text-heading">Email</div>
              <div className="text-body flex items-center gap-2">
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-hover transition-colors hover:underline">
                  {contactInfo.email}
                </a>
                <CopyButton textToCopy={contactInfo.email} label="Copy email address" className="text-primary-hover hover:text-primary" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.3} animateOnMount={true}>
        <h3 className="text-xl font-bold text-heading mb-6">Office Hours</h3>
        <div className="space-y-2 text-body">
          {officeHours.map((schedule, index) => (
            <div key={index} className="flex justify-between">
              <span>{schedule.days}</span>
              <span>{schedule.hours}</span>
            </div>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.4} animateOnMount={true}>
        <h3 className="text-xl font-bold text-heading mb-6">What to Expect</h3>
        <ul className="space-y-3 text-body">
          {whatToExpect.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-0.5">
                <Check className="w-5 h-5 text-primary-hover flex-shrink-0" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedContainer>
    </div>
  )
}

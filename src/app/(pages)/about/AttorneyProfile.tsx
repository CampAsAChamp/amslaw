"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import EducationCard from "@/app/(pages)/about/EducationCard"
import CredentialsCard from "@/app/(pages)/about/CredentialsCard"

const educationData = [
  { degree: "Juris Doctor", institution: "Whittier Law School" },
  { degree: "Bachelor of Science", institution: "California State University of Long Beach" },
]

const credentialsData = [
  "Licensed to practice in California",
  "California State Bar Association - Member",
  "U.S. District Court for the Eastern District - State of California",
  "U.S. District Court for the Central District - State of California",
]

export default function AttorneyProfile() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="container-page">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-heading mb-8 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          Meet Your Attorney
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <motion.div
              className="space-y-4 text-body mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <p>
                I have been a practicing attorney for 32 years and focus on <strong>Estate Planning</strong>,{" "}
                <strong>Wills</strong>, <strong>Trusts</strong>, <strong>Trust Administration</strong>, and{" "}
                <strong>Probate</strong> matters. I am dedicated to helping families protect their assets and ensure
                their wishes are carried out exactly as intended.
              </p>
              <p>
                Allowing me to provide extra care and tailored solutions to my clients for each family&apos;s unique
                situation. I believe that every family deserves personalized attention
              </p>
              <p>
                I understand that discussing estate planning can be difficult, which is why I approach every client
                relationship with compassion, patience, and clear communication. My goal is to make the process as
                straightforward as possible while ensuring your family&apos;s future is secure.
              </p>
            </motion.div>

            <div className="space-y-6">
              <EducationCard items={educationData} delay={0.2} />
              <CredentialsCard items={credentialsData} delay={0.3} />
            </div>
          </div>

          <motion.div
            className="card order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
              <Image
                src="/attorney-headshot.jpg"
                alt="Attorney Anna Schneider"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-heading mb-2">Anna Schneider</h3>
              <p className="text-primary-hover font-semibold mb-4">Principal Attorney</p>
              <p className="text-body mb-6">
                Focus on Estate Planning, Wills, Trusts, Trust Administration, and Probate matters.
              </p>
              <Link href="/contact" className="btn-cta">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

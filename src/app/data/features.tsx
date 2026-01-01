import { Clock, FileCheck, FileEdit, FileSearch, GraduationCap, Handshake, Heart, Lock, MessageCircle, UserCheck } from "lucide-react"

// Why choose us features
export const whyChooseUsFeatures = [
  {
    icon: <GraduationCap className="w-8 h-8 text-primary-hover" />,
    title: "Expert Knowledge",
    description: "Expertise in estate planning and probate law",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary-hover" />,
    title: "Personalized Service",
    description: "Tailored solutions that meet your unique needs and goals",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary-hover" />,
    title: "Confidentiality",
    description: "Complete privacy and discretion in all matters",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary-hover" />,
    title: "Quick Response",
    description: "Fast, reliable service when you need it most",
  },
]

// Philosophy features
export const philosophyFeatures = [
  {
    icon: <Heart className="w-8 h-8 text-primary-hover" />,
    title: "Compassionate Service",
    description:
      "I understand that estate planning involves sensitive family matters. I approach every case with empathy and respect for your unique situation.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary-hover" />,
    title: "Expert Knowledge",
    description:
      "My focus on estate planning means I stay current with the latest laws and strategies to provide you with the best possible outcome for your family.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary-hover" />,
    title: "Clear Communication",
    description:
      "Legal matters can be complex, but I explain everything in plain language so you understand your options and can make informed decisions.",
  },
]

// Process steps
export const processSteps = [
  {
    stepNumber: 1,
    icon: <Handshake className="w-12 h-12" />,
    title: "Initial Contact",
    description: "I discuss your goals, family situation, and assets to understand your needs.",
  },
  {
    stepNumber: 2,
    icon: <FileEdit className="w-12 h-12" />,
    title: "Create Your Plan",
    description: "I create a personalized estate plan tailored to your specific circumstances.",
  },
  {
    stepNumber: 3,
    icon: <FileSearch className="w-12 h-12" />,
    title: "Document Review",
    description: "I send all documents to you for review and approval to ensure they meet your goals & needs.",
  },
  {
    stepNumber: 4,
    icon: <FileCheck className="w-12 h-12" />,
    title: "Sign & Finalize",
    description: "We meet to sign and properly execute your estate plan documents.",
  },
]

// Statistics
export const stats = [
  { number: "1000+", label: "Estate Plans Created" },
  { number: "30+", label: "Years Experience" },
]

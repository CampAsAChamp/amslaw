import { FileSignature, Gavel, Scroll } from "lucide-react"

// Service data for estate planning services
export const services = [
  {
    icon: <FileSignature className="w-12 h-12" />,
    title: "Wills & Testaments",
    description:
      "Create legally binding documents that ensure your assets are distributed according to your wishes and your family is protected.",
    features: ["Last Will and Testament", "Healthcare Directives", "Power of Attorney"],
  },
  {
    icon: <Scroll className="w-12 h-12" />,
    title: "Trust Planning",
    description:
      "Establish trusts to protect your assets, minimize taxes, and provide for your loved ones with professional trust administration.",
    features: ["Revocable Living Trusts", "Irrevocable Trusts", "Special Needs Trusts", "Charitable Trusts"],
  },
  {
    icon: <Gavel className="w-12 h-12" />,
    title: "Probate & Administration",
    description: "Navigate the probate process with expert guidance to ensure efficient estate administration and asset distribution.",
    features: ["Probate Administration", "Estate Administration", "Asset Distribution", "Court Representation"],
  },
]

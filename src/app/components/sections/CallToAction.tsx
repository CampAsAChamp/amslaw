import Link from "next/link"
import { CallToActionProps } from "@/types"

export default function CallToAction({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundClass = "bg-gradient-to-r from-primary-hover to-primary-dark",
}: CallToActionProps) {
  return (
    <section className={`${backgroundClass} text-on-primary py-16`}>
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hero-heading">{title}</h2>
        <p className="text-xl mb-8 text-hero-body max-w-2xl mx-auto">{subtitle}</p>
        <Link href={buttonLink} className="btn-hero-secondary">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}

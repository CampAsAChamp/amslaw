import { contactInfo, officeHours, yelpReviews } from "@/app/data"

/**
 * StructuredData Component
 * Adds Schema.org JSON-LD structured data for local business, attorney, and review information
 * This helps search engines understand the business and display rich results
 */
export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://annamschneiderlaw.com"

  // Calculate average rating from Yelp reviews
  const totalReviews = yelpReviews.length
  const averageRating = totalReviews > 0 ? yelpReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 5

  // LocalBusiness schema with Attorney subtype
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "Anna M. Schneider Law",
    description:
      "Professional estate planning attorney specializing in wills, trusts, and probate in Torrance, California. Protecting families with personalized legal services.",
    url: baseUrl,
    logo: `${baseUrl}/schneider-law-logo-light.svg`,
    image: `${baseUrl}/opengraph-image`,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contactInfo.address.street}, ${contactInfo.address.suite}`,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "33.8361935",
      longitude: "-118.3526581",
    },
    openingHoursSpecification: officeHours
      .map((schedule) => {
        const days = schedule.days.split(" - ")
        const hours = schedule.hours

        // Handle closed days
        if (hours === "Closed") {
          return null
        }

        // Parse hours (e.g., "9:00 AM - 4:00 PM")
        const [opens, closes] = hours.split(" - ").map((time) => {
          const [hourMinute, period] = time.trim().split(" ")
          const [hour, minute] = hourMinute.split(":")
          let hour24 = parseInt(hour)
          if (period === "PM" && hour24 !== 12) hour24 += 12
          if (period === "AM" && hour24 === 12) hour24 = 0
          return `${hour24.toString().padStart(2, "0")}:${minute}:00`
        })

        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: days.length === 1 ? days[0] : days,
          opens,
          closes,
        }
      })
      .filter(Boolean),
    areaServed: {
      "@type": "City",
      name: "Torrance",
      "@id": "https://en.wikipedia.org/wiki/Torrance,_California",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
  }

  // LegalService schema
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Anna M. Schneider Law - Estate Planning Services",
    provider: {
      "@type": "Attorney",
      name: "Anna M. Schneider",
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    serviceType: ["Estate Planning", "Living Trusts", "Wills", "Probate", "Trust Administration", "Power of Attorney"],
  }

  // Review schema for each Yelp review
  const reviewSchemas = yelpReviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Attorney",
      name: "Anna M. Schneider Law",
    },
    author: {
      "@type": "Person",
      name: review.user.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.text,
    datePublished: review.time_created,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchema),
        }}
      />
      {reviewSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}

import { TestimonialCardProps } from "@/types"

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <div className="border-l-4 border-primary pl-6">
      <p className="text-body mb-4 italic">&ldquo;{quote}&rdquo;</p>
      <div className="font-semibold text-heading">- {author}</div>
    </div>
  )
}

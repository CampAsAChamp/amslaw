import Link from 'next/link';
import { ServiceCardProps } from '@/types';

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  buttonText,
  buttonLink
}: ServiceCardProps) {
  return (
    <div className="card-base">
      <div className="text-primary-hover mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-heading mb-4">{title}</h3>
      <p className="text-body mb-6">
        {description}
      </p>
      <ul className="text-sm text-body space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className="btn-primary"
      >
        {buttonText}
      </Link>
    </div>
  );
}


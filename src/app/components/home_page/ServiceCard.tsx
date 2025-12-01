import { ServiceCardProps } from '@/types';

export default function ServiceCard({
  icon,
  title,
  description,
  features
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
      <ul className="text-sm text-body space-y-2">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}


import { FeatureCardProps } from '@/types';

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="icon-circle">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
      <p className="text-body">{description}</p>
    </div>
  );
}


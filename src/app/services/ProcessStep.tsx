import { ProcessStepProps } from '@/types';

export default function ProcessStep({ stepNumber, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="icon-circle">
        <span className="text-2xl font-bold text-primary-hover">{stepNumber}</span>
      </div>
      <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
      <p className="text-body">{description}</p>
    </div>
  );
}


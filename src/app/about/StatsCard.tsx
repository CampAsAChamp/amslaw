import { StatsCardProps } from '@/types';

export default function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary-hover mb-2">{number}</div>
      <div className="text-body">{label}</div>
    </div>
  );
}


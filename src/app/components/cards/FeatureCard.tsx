'use client';

import { motion } from 'framer-motion';
import { FeatureCardProps } from '@/types';

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      <div className="icon-circle">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
      <p className="text-body">{description}</p>
    </motion.div>
  );
}


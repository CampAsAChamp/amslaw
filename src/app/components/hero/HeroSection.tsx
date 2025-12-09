'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroSectionProps } from '@/types';

export default function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundClass = "bg-gradient-to-r from-primary-hover to-primary-dark",
  showLogo = false
}: HeroSectionProps) {
  const logoVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8
    },
    animate: { 
      opacity: 1,
      scale: 1
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0
    }
  };

  const buttonVariants = {
    initial: { 
      scaleX: 0.05,
      scaleY: 0.05,
      opacity: 0
    },
    animate: { 
      scaleX: 1,
      scaleY: 1,
      opacity: 1
    }
  };

  return (
    <section className={`${backgroundClass} text-on-primary section-padding`}>
      <div className="section-container">
        <div className="text-center">
          {showLogo && (
            <motion.div 
              className="mb-16 flex justify-center"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <Image 
                src="/schneider-law-logo.svg" 
                alt="Schneider Law" 
                width={400} 
                height={133}
                className="h-40 w-auto filter brightness-0 invert"
                priority
              />
            </motion.div>
          )}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-hero-heading"
            variants={textVariants}
            initial="initial"
            animate="animate"
            transition={{ 
              duration: 0.6,
              ease: "easeOut",
              delay: showLogo ? 0.4 : 0
            }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-hero-body max-w-3xl mx-auto"
            variants={textVariants}
            initial="initial"
            animate="animate"
            transition={{ 
              duration: 0.6,
              ease: "easeOut",
              delay: showLogo ? 0.55 : 0.15
            }}
          >
            {subtitle}
          </motion.p>
          <div className="flex flex-row gap-8 justify-center">
            <motion.div
              key="primary-button"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              transition={{ 
                type: 'spring' as const,
                stiffness: 200,
                damping: 20,
                delay: showLogo ? 0.7 : 0.3
              }}
            >
              <Link
                href={primaryButtonLink}
                className="btn-hero-secondary"
              >
                {primaryButtonText}
              </Link>
            </motion.div>
            {secondaryButtonText && secondaryButtonLink && (
              <motion.div
                key="secondary-button"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                transition={{ 
                  type: 'spring' as const,
                  stiffness: 200,
                  damping: 20,
                  delay: showLogo ? 0.85 : 0.45
                }}
              >
                <Link
                  href={secondaryButtonLink}
                  className="btn-hero-primary"
                >
                  {secondaryButtonText}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

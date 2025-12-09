'use client';

import { motion } from 'framer-motion';
import { CopyButton } from '@/app/components/ui';
import { icons, whatToExpect, officeHours, contactInfo } from '@/app/data';
import { formatPhoneNumber, formatAddressMultiLine } from '@/utils';

export default function ContactInfo() {
  const addressLines = formatAddressMultiLine(contactInfo.address);
  
  const cardVariants = {
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

  const contentVariants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    animate: { 
      opacity: 1,
      y: 0
    }
  };
  
  return (
    <div className="space-y-8">
      <motion.div 
        key="office-info"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ 
          type: 'spring' as const,
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{ 
            duration: 0.4,
            delay: 0.5
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">Office Information</h3>
          <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Address</div>
              <a 
                href={contactInfo.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-primary-hover transition-colors hover:underline"
              >
                {addressLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < addressLines.length - 1 && <><br /></>}
                  </span>
                ))}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Phone</div>
              <div className="text-body flex items-center gap-2">
                <a 
                  href={`tel:${contactInfo.phone}`} 
                  className="hover:text-primary-hover transition-colors hover:underline"
                >
                  {formatPhoneNumber(contactInfo.phone)}
                </a>
                <CopyButton textToCopy={formatPhoneNumber(contactInfo.phone)} label="Copy phone number" className="text-primary-hover hover:text-primary" />
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Email</div>
              <div className="text-body flex items-center gap-2">
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="hover:text-primary-hover transition-colors hover:underline"
                >
                  {contactInfo.email}
                </a>
                <CopyButton textToCopy={contactInfo.email} label="Copy email address" className="text-primary-hover hover:text-primary" />
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>

      <motion.div 
        key="office-hours"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ 
          type: 'spring' as const,
          stiffness: 200,
          damping: 20,
          delay: 0.3
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{ 
            duration: 0.4,
            delay: 0.6
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">Office Hours</h3>
          <div className="space-y-2 text-body">
            {officeHours.map((schedule, index) => (
              <div key={index} className="flex justify-between">
                <span>{schedule.days}</span>
                <span>{schedule.hours}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        key="what-to-expect"
        className="card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ 
          type: 'spring' as const,
          stiffness: 200,
          damping: 20,
          delay: 0.4
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{ 
            duration: 0.4,
            delay: 0.7
          }}
        >
          <h3 className="text-xl font-bold text-heading mb-6">What to Expect</h3>
          <ul className="space-y-3 text-body">
            {whatToExpect.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5">{icons.checkmarkSmall}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}


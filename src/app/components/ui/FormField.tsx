'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  rows?: number;
}

export default function FormField({
  id,
  name,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder,
  options = [],
  rows = 5,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const baseInputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  return (
    <div>
      <motion.label
        htmlFor={id}
        className="block text-sm font-bold text-nav mb-2"
        animate={{
          color: isFocused ? 'var(--cyan-500)' : 'var(--text-nav)',
          scale: isFocused ? 1.02 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </motion.label>

      {type === 'textarea' ? (
        <motion.textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={rows}
          className={baseInputClasses}
          placeholder={placeholder}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />
      ) : type === 'select' ? (
        <motion.select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`${baseInputClasses} ${value === '' ? 'select-placeholder' : ''}`}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
      ) : (
        <motion.input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={baseInputClasses}
          placeholder={placeholder}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}


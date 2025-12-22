"use client"

import { motion } from "framer-motion"

const pageVariants = {
  initial: {
    x: -20,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: 20,
  },
}

const pageTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      {children}
    </motion.div>
  )
}

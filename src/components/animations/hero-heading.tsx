"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

interface HeroHeadingProps {
  title: string
  brandName: string
  subtitle?: string
}

export function HeroHeading({ title, brandName, subtitle }: HeroHeadingProps) {
  return (
    <div className="text-center py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
          <span className="block md:inline">{title}</span>{" "}
          <span className="relative inline-flex items-center">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {brandName}
            </span>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              className="absolute -right-8 -top-1"
            >
              <Flame className="h-6 w-6 text-orange-500" />
            </motion.div>
          </span>
        </h1>
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6 rounded-full"
      />
    </div>
  )
}

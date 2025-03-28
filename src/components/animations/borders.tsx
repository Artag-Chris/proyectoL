"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface BorderAnimationProps {
  children: React.ReactNode
  borderColor?: string
  borderWidth?: string
  duration?: number
}

export default function BorderAnimation({
  children,
  borderColor = "black",
  borderWidth = "2px",
  duration = 6,
}: BorderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          })
        }
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [])

  const pathLength = (dimensions.width + dimensions.height) * 2
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <div ref={containerRef} className="relative">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <motion.rect
            x="0"
            y="0"
            width={dimensions.width}
            height={dimensions.height}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            initial="hidden"
            animate="visible"
            variants={pathVariants}
            style={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
          />
        </svg>
      )}
      {children}
    </div>
  )
}

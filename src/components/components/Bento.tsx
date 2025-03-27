"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "./product-card"

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
}

interface BentoSectionProps {
  soldProducts: Product[]
  containerVariants?: any
}

export function BentoSection({
  soldProducts,
  containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
}: BentoSectionProps) {
  const [products, setProducts] = useState(soldProducts)

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...products].sort(() => Math.random() - 0.5)
      setProducts(shuffled)
    }, 5000) // Cambia los elementos cada 5 segundos

    return () => clearInterval(interval)
  }, [products])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {products.slice(0, 10).map((product, index) => {
            // Define grid positions based on index
            const gridClasses = getGridClasses(index)

            return (
              <motion.div
                layout
                key={product.id}
                className={`rounded-xl overflow-hidden shadow-lg ${gridClasses}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  zIndex: 10,
                }}
              >
                <ProductCard {...product} isFeatured={index === 0 || index === 3} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Helper function to get grid classes based on index
function getGridClasses(index: number): string {
  switch (index) {
    case 0: // Featured item - large
      return "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto"
    case 1: // Wide item
      return "sm:col-span-2 aspect-video"
    case 3: // Tall item
      return "sm:row-span-2 aspect-[3/4]"
    case 5: // Wide item
      return "sm:col-span-2 aspect-video"
    case 7: // Wide item on larger screens
      return "lg:col-span-2 aspect-video"
    default:
      return "aspect-square"
  }
}


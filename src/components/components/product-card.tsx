"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import useCartStore from "@/utils/store/cartStore"

interface ProductCardProps {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
  isFeatured?: boolean
}

export function ProductCard({ id, name, price, imageUrl, description, isFeatured = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({ id, name, quantity: 1, price, imageUrl })
  }

  return (
    <Card className="w-full h-full overflow-hidden border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl group relative hover:border-gray-300 transition-all duration-300 rounded-xl">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {name}</span>
      </Link>

      <div className="relative w-full h-full overflow-hidden">
        {/* Image container with proper aspect ratio */}
        <div className="relative w-full h-2/3">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isFeatured}
          />
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white p-3 md:p-4 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h3
              className={`font-semibold text-gray-900 mb-1 line-clamp-2 ${isFeatured ? "text-lg md:text-xl" : "text-sm md:text-base"}`}
            >
              {name}
            </h3>

            <p className={`text-gray-600 text-xs md:text-sm line-clamp-1 ${isFeatured ? "md:line-clamp-2" : ""}`}>
              {description}
            </p>
          </motion.div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <span className={`font-bold text-gray-900 ${isFeatured ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>
              ${price.toFixed(2)}
            </span>

            <Button
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white text-xs px-3 py-1 z-20 relative opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shadow-md"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAddToCart()
              }}
            >
              Añadir
            </Button>
          </div>
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              Destacado
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}

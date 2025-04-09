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
    <Card className="w-full h-full overflow-hidden border border-white/20 bg-transparent backdrop-blur-sm group relative hover:border-white/40 transition-colors duration-300">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {name}</span>
      </Link>

      <div className="relative w-full h-full overflow-hidden">
        {/* Image container with proper aspect ratio */}
        <div className="relative w-full h-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={isFeatured}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className={`font-bold mb-1 line-clamp-2 ${isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
              {name}
            </h3>

            <p className={`line-clamp-2 text-white/80 mb-2 ${isFeatured ? "md:line-clamp-3" : "hidden sm:block"}`}>
              {description}
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold">${price.toFixed(2)}</span>

              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white z-20 relative opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
              >
                Añadir
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}


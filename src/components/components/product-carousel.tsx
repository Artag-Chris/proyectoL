'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import useCartStore from '@/utils/store/cartStore'
// Importa el store del carrito

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
}

interface ProductCarouselProps {
  product: Product[]
}

export function ProductCarousel({ product }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const addItem = useCartStore((state) => state.addItem) // Obtén la función addItem del store

  const nextSlide = useCallback(() => {
    if (isAutoPlay) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.length)
    }
  }, [isAutoPlay, product.length])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + product.length) % product.length)
    setIsAutoPlay(false)
  }

  const manualNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.length)
    setIsAutoPlay(false)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://d1ih8jugeo2m5m.cloudfront.net/2024/10/velas_aromaticas-768x512.jpg"
          alt="Candles Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
        />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10">
        <motion.div
         className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {product.map((product) => (
            <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
             key={product.id} className="w-full flex-shrink-0 p-4">
              <Card className="w-full max-w-sm mx-auto overflow-hidden backdrop-blur-md bg-white/30 border-none shadow-lg">
                <div className="relative w-full h-48">
                  <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-md"
                  />
                  </Link>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-amber-800">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-700 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-amber-800">${product.price.toFixed(2)}</span>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => addItem({ id: product.id, name: product.name, quantity: 1, price: product.price, imageUrl: product.imageUrl })}
                  >
                    Añadir al carrito
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <Button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-orange-500/50 hover:bg-orange-600/50" onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-orange-500/50 hover:bg-orange-600/50" onClick={manualNextSlide}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

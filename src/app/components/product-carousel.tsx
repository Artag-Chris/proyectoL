'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'


interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const nextSlide = useCallback(() => {
    if (isAutoPlay) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }
  }, [isAutoPlay, products.length])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
    setIsAutoPlay(false)
  }

  const manualNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    setIsAutoPlay(false)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {products.map((product) => (
          <div key={product.id} className="w-full flex-shrink-0 p-4">
            <Card className="w-full max-w-sm mx-auto overflow-hidden backdrop-blur-md bg-white/30 border-none shadow-lg">
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-md"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
                  Añadir al carrito
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <Button className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevSlide}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={manualNextSlide}>
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}


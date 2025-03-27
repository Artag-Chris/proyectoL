"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import useCartStore from "@/utils/store/cartStore"

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
}

interface ProductCarouselProps {
  product: Product[]
  title?: string
}

export function ProductCarousel({ product, title = "Productos Destacados" }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)

  const addItem = useCartStore((state) => state.addItem)

  // Filter out products with missing data
  const validProducts = product.filter((p) => p && p.imageUrl && p.name)

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleCount(1)
      } else if (width < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [product])

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, validProducts.length - visibleCount)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, validProducts.length - visibleCount)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, visibleCount, validProducts.length])

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full p-6 space-y-6">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (!validProducts.length) {
    return (
      <div className="w-full p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">No hay productos disponibles en este momento.</p>
      </div>
    )
  }

  // Get visible products
  const visibleProducts = validProducts.slice(currentIndex, currentIndex + visibleCount)

  // If we need more items to fill the view and we want to loop
  if (visibleProducts.length < visibleCount && validProducts.length > visibleCount) {
    const remaining = visibleCount - visibleProducts.length
    const additionalProducts = validProducts.slice(0, remaining)
    visibleProducts.push(...additionalProducts)
  }

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-800">{title}</h2>

        <div
          ref={carouselRef}
          className="relative overflow-hidden rounded-xl border-2 border-black bg-gradient-to-b from-amber-50 to-amber-100 p-6"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://d1ih8jugeo2m5m.cloudfront.net/2024/10/velas_aromaticas-768x512.jpg"
              alt="Candles Background"
              fill
              style={{ objectFit: "cover" }}
              className="opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 to-amber-100/80 backdrop-blur-sm" />
          </div>

          {/* Carousel Content */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden backdrop-blur-md bg-white/70 border-black border-2 shadow-lg flex flex-col">
                    <Link href={`/product/${item.id}`} className="relative block overflow-hidden group">
                      <div className="relative w-full pt-[75%] overflow-hidden">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                    </Link>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold text-amber-800 line-clamp-1">{item.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="pb-2 flex-grow">
                      <p className="text-sm text-amber-700 line-clamp-2">{item.description}</p>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center pt-2 mt-auto">
                      <span className="text-xl font-bold text-amber-800">${item.price.toFixed(2)}</span>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white border-black border-2 transition-all duration-300 hover:shadow-md"
                        onClick={(e) => {
                          e.preventDefault()
                          addItem({
                            id: item.id,
                            name: item.name,
                            quantity: 1,
                            price: item.price,
                            imageUrl: item.imageUrl,
                          })
                        }}
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Añadir</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {validProducts.length > visibleCount && (
              <>
                <button
                  className="absolute top-1/2 -left-3 md:left-2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-2 md:p-3 border-2 border-black z-10"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                  className="absolute top-1/2 -right-3 md:right-2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-2 md:p-3 border-2 border-black z-10"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </>
            )}
          </div>

          {/* Navigation Dots */}
          {validProducts.length > visibleCount && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {Array.from({ length: Math.min(5, Math.ceil(validProducts.length / visibleCount)) }).map((_, index) => {
                const isActive = Math.floor(currentIndex / visibleCount) === index
                return (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-orange-500 border-2 border-black scale-110" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index * visibleCount)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


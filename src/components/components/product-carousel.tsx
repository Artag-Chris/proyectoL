"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/utils/store/cartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface ProductCarouselProps {
  product: Product[];
}

export function ProductCarousel({ product }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const displayedProducts = product.slice(0, 6);

  const nextSlide = useCallback(() => {
    if (isAutoPlay) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProducts.length);
    }
  }, [isAutoPlay, displayedProducts.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedProducts.length) % displayedProducts.length)
    setIsAutoPlay(false)
  }

  const manualNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProducts.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-black p-4 border-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" style={{ height: '120vh', position: 'absolute' }}>
        <Image
          src="https://d1ih8jugeo2m5m.cloudfront.net/2024/10/velas_aromaticas-768x512.jpg"
          alt="Candles Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayedProducts.map((product) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={product.id}
                className="w-full flex-shrink-0 p-4 mb-4 flex items-start justify-center"
              >
                <Card className="w-full max-w-sm mx-auto overflow-hidden backdrop-blur-md bg-white/30 border-black border-2 shadow-lg">
                  <Link href={`/product/${product.id}`} passHref>
                    <div className="relative w-full h-48 cursor-pointer">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-md"
                      />
                    </div>
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-amber-800">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-700 line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-800">${product.price.toFixed(2)}</span>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white border-black border-2"
                      onClick={() => addItem({ id: product.id, name: product.name, quantity: 1, price: product.price, imageUrl: product.imageUrl })}
                    >
                      Añadir al carrito
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.button
          className="absolute top-1/2 left-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-3 m-2 border-2 border-black"
          onClick={prevSlide}
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.8 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          className="absolute top-1/2 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-3 m-2 border-2 border-black"
          onClick={manualNextSlide}
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.8 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {displayedProducts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
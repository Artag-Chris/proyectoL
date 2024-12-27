'use client'

import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Categories } from '@/components/components/categories'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'
import { ProductCard } from '@/components/components/product-card'
import { ProductCarousel } from '@/components/components/product-carousel'

const products = [
  { 
    id: 1, 
    name: 'Vela Aromática Lavanda', 
    price: 19.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática de lavanda hecha a mano con cera de soja natural y aceites esenciales.'
  },
  { 
    id: 2, 
    name: 'Set de Velas de Vainilla', 
    price: 29.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 3 velas de vainilla con diferentes tamaños, perfectas para crear un ambiente acogedor.'
  },
  { 
    id: 3, 
    name: 'Difusor de Aceites Esenciales', 
    price: 39.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Difusor ultrasónico para aceites esenciales con luz LED de colores cambiantes.'
  },
  { 
    id: 4, 
    name: 'Vela de Soja Cítrica', 
    price: 24.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela de soja con aroma cítrico refrescante, ideal para energizar espacios.'
  },
  { 
    id: 5, 
    name: 'Set de Mini Velas Aromáticas', 
    price: 34.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 6 mini velas aromáticas con diferentes fragancias para variar el ambiente.'
  },
  { 
    id: 6, 
    name: 'Vela de Madera y Ámbar', 
    price: 27.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela con aroma a madera y ámbar en un elegante recipiente de vidrio.'
  },
]

const soldProducts = [
  { 
    id: 7, 
    name: 'Vela Aromática de Jazmín', 
    price: 22.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con fragancia de jazmín, perfecta para relajarse después de un largo día.'
  },
  { 
    id: 8, 
    name: 'Set de Velas Flotantes', 
    price: 19.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 12 velas flotantes sin aroma, ideales para decorar piscinas o centros de mesa.'
  },
  { 
    id: 9, 
    name: 'Vela de Masaje', 
    price: 32.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela de masaje que se derrite en un aceite cálido y aromático para una experiencia relajante.'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl font-bold text-center my-8 text-amber-800">Bienvenido a AromaFlame</h1>
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-amber-700">Categorías</h2>
        <Categories />
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-amber-700">Últimos productos vendidos</h2>
        <ProductCarousel products={soldProducts} />
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-amber-700">Lo último en llegar</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <div key={product.id} className={`
              backdrop-blur-md bg-white/30 rounded-lg overflow-hidden shadow-lg
              ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              ${index === 1 ? 'md:col-span-2' : ''}
              ${index === 3 ? 'md:row-span-2' : ''}
              ${index === 5 ? 'md:col-span-2' : ''}
            `}>
              <ProductCard {...product} />
            </div>
          ))}
        </motion.div>
      </div>
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 bg-orange-500 text-white rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}


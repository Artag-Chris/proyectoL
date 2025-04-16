"use client"

import { Suspense, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "@/components/components/footer"
import { Navbar } from "@/components/components/navbar"
import { ProductCarousel } from "@/components/components/product-carousel"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import useGetProducts from "../hooks/useGetProducts"
import { BentoSection } from "@/components/components/Bento"
import { HeroHeading } from "@/components/animations/hero-heading"
import { Categories } from "@/components/components/categories"



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { data, loading } = useGetProducts()
  const { product, } = data

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <PageTransition />
      <FadeInTransition position="bottom">
        <Navbar />
      </FadeInTransition>
      <div className="container mx-auto px-4 flex-grow">
        <HeroHeading
          title="Bienvenido a"
          brandName="AromaFlame"
          subtitle="Descubre fragancias que transformarán tu espacio y crearán momentos inolvidables"
        />

        <Categories/>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-[var(--color-text)]">Últimos productos vendidos</h2>

        <Suspense fallback={<div>Cargando...</div>}>
          <ProductCarousel product={product} />
        </Suspense>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-[var(--color-text)]">Lo último en llegar</h2>
        {loading ? (
          <div className="text-center text-xl">Cargando productos...</div>
        ) : (
          <BentoSection soldProducts={product} containerVariants={containerVariants} />
        )}

        {/* Sección hero con CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 relative bg-gradient-to-r from-orange-500/90 to-red-600/90 py-16 px-6 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Cotiza tu Vela Aromática Personalizada
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              Crea la atmósfera perfecta para cualquier ocasión con nuestras velas aromáticas personalizadas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="https://wa.me/1234567890?text=Hola,%20me%20gustaría%20cotizar%20una%20vela%20aromática%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white hover:bg-white/90 text-orange-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Cotizar por WhatsApp
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 bg-[var(--color-energy)] text-white rounded-full shadow-lg"
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

"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Categories } from "@/components/components/categories";
import { Footer } from "@/components/components/footer";
import { Navbar } from "@/components/components/navbar";
import { ProductCard } from "@/components/components/product-card";
import { ProductCarousel } from "@/components/components/product-carousel";
import PageTransition from "@/components/transitions/PageTransition";
import { FadeInTransition } from "@/components/transitions/FadeIn";
import useGetProducts from "../hooks/useGetProducts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { data, loading } = useGetProducts();
  const { soldProducts } = data;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-custom">
      <PageTransition />
      <FadeInTransition position="bottom">
        <Navbar />
      </FadeInTransition>
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl font-bold text-center my-8 text-[var(--color-text)]">
          Bienvenido a AromaFlame
        </h1>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-[var(--color-text)]">
          Categorías
        </h2>

        { <Categories /> }

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-[var(--color-text)]">
          Últimos productos vendidos
        </h2>

        <Suspense fallback={<div>Cargando...</div>}>
          <ProductCarousel product={soldProducts} />
        </Suspense>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-[var(--color-text)]">
          Lo último en llegar
        </h2>
        {loading ? (
          <div className="text-center text-xl">Cargando productos...</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {soldProducts.map((product, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={product.id}
                className={`
                  backdrop-blur-md bg-white/30 rounded-lg overflow-hidden shadow-lg
                  ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  ${index === 1 ? "md:col-span-2" : ""}
                  ${index === 3 ? "md:row-span-2" : ""}
                  ${index === 5 ? "md:col-span-2" : ""}
                `}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* Nueva sección hero con CTA */}
        <div
          className="mt-16 relative bg-cover bg-center py-24 rounded-lg overflow-hidden"
        //  style={{ backgroundImage: "url('/candles-background.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Cotiza tu Vela Aromática Personalizada
            </h2>
            <p className="text-xl text-white mb-8">
              Crea la atmósfera perfecta para cualquier ocasión con nuestras
              velas aromáticas personalizadas.
            </p>
            <Link
              href="https://wa.me/1234567890?text=Hola,%20me%20gustaría%20cotizar%20una%20vela%20aromática%20personalizada"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[var(--color-energy)] hover:bg-[var(--color-warmth)] text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
                Cotizar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
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
  );
}

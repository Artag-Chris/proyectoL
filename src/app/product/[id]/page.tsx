'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'
import useGetProductById from '@/hooks/useGetProductById'
import { useParams } from 'next/navigation'
import useCartStore from '@/utils/store/cartStore'
import BorderAnimation from '@/components/animations/borders'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const parsedId = id ? parseInt(id as string, 10) : null;
  const { data: product } = useGetProductById(parsedId || 0);
  const addItem = useCartStore((state) => state.addItem); // Obtén la función addItem del cartstore

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        imageUrl: product.imageUrl || '/placeholder.svg' // Agrega el campo imageUrl
      });
 
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <BorderAnimation borderColor="black" borderWidth="5px" duration={9}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Imagen del producto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
            style={{ position: 'relative' }} // Añadir posición relativa
          >
            {product && (
              <Image
                src={product.imageUrl ? product.imageUrl : '/placeholder.svg?height=600&width=600'}
                alt={product.name || 'Product Image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </motion.div>

          {/* Información del producto */}
          <div className="flex flex-col justify-between">
            {product && (
              <>
                <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
                <p className="text-2xl font-semibold mb-6 text-black">${product.price}</p>
                <p className="text-black/80 mb-8">{product.description}</p>
              </>
            )}
            <p className="text-black/80 mb-8">{product?.description}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-xl font-semibold text-black">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button
                className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                onClick={handleAddToCart} // Añade el producto al carrito
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-black">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/*
            relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
                    <p className="text-black font-semibold">${product.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
*/              }
          </div>
        </section>
        </BorderAnimation>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, MessageCircle, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'
import { ProductCard } from '@/components/components/product-card'

// Datos dummy para el ejemplo
const product = {
  id: 1,
  name: 'Vela Aromática de Lavanda Premium',
  price: 29.99,
  rating: 4.5,
  reviews: 128,
  stock: 15,
  description: 'Vela aromática artesanal de lavanda, elaborada con cera de soja 100% natural y aceites esenciales puros. Perfecta para crear un ambiente relajante y aromático en cualquier espacio.',
  features: [
    'Tiempo de quemado: 40-45 horas',
    'Ingredientes naturales',
    'Sin parabenos',
    'Fabricación artesanal',
    'Mecha de algodón',
    'Envase reciclable'
  ],
  images: [
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600'
  ],
  questions: [
    {
      id: 1,
      question: '¿Es segura para mascotas?',
      answer: 'Sí, nuestra vela es segura alrededor de mascotas, pero recomendamos mantenerla fuera de su alcance.',
      author: 'María G.',
      date: '2023-12-01'
    },
    {
      id: 2,
      question: '¿Cuánto dura el aroma?',
      answer: 'El aroma permanece durante todo el tiempo de quemado de la vela (40-45 horas).',
      author: 'Juan P.',
      date: '2023-11-28'
    }
  ]
}

const relatedProducts = [
  {
    id: 2,
    name: 'Vela de Vainilla',
    price: 24.99,
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con esencia de vainilla natural.'
  },
  {
    id: 3,
    name: 'Vela de Canela',
    price: 26.99,
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con aroma a canela recién molida.'
  },
  {
    id: 4,
    name: 'Vela de Sándalo',
    price: 29.99,
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con esencia de sándalo puro.'
  }
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-8">
          <span className="text-[var(--color-primary-dark)]">Inicio</span>
          {' / '}
          <span className="text-[var(--color-primary-dark)]">Velas Aromáticas</span>
          {' / '}
          <span>{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-[var(--color-primary)]'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews} valoraciones
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold">${product.price}</div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border p-2"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">
                  {product.stock} unidades disponibles
                </span>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                  Comprar ahora
                </Button>
                <Button className="flex-1 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="questions">Preguntas</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card className="glass-card">
              <CardContent className="p-6">
                <p>{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <Card className="glass-card">
              <CardContent className="p-6">
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="questions" className="mt-4">
            <Card className="glass-card">
              <CardContent className="p-6 space-y-6">
                {product.questions.map((qa) => (
                  <div key={qa.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-[var(--color-primary)]" />
                      <div>
                        <p className="font-semibold">{qa.question}</p>
                        <p className="text-sm text-gray-600">
                          Preguntado por {qa.author} - {qa.date}
                        </p>
                      </div>
                    </div>
                    <p className="ml-7">{qa.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


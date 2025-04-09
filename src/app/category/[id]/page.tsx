"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import useGetCategoryProducts from "@/hooks/useGetCategoryProducts"
import { Search, ShoppingCart, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CategoryPage() {
  const { id } = useParams()
  const categoryId = id ? id.toString() : ""
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (categoryId) {
      setLoadingMessage(`Cargando: ${categoryId}`)
      const timer = setTimeout(() => {
        setLoadingMessage(null)
      }, 2000) // Tiempo mínimo de espera de 2 segundos

      return () => clearTimeout(timer)
    }
  }, [categoryId])

  const { products, loading, error } = useGetCategoryProducts(categoryId)

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!products) return []
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [products, searchQuery])

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Animation variants for each item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  if (loading || loadingMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-medium text-orange-800">{loadingMessage || "Cargando productos..."}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-800">{error}</p>
          <Link href="/categories">
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a categorías
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">No hay productos</h2>
          <p className="text-gray-800">No se encontraron productos para esta categoría.</p>
          <Link href="/categories">
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a categorías
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-yellow-200 p-4 md:p-8">
      <PageTransition />
      <FadeInTransition position="right">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link href="/categories">
                <Button variant="ghost" className="mb-2 text-orange-800 hover:text-orange-900 hover:bg-orange-100 p-0">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver a categorías
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                {products[0]?.category || "Productos"}
              </h1>
              <p className="text-orange-800 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"} encontrados
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={18} />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} whileHover="hover" className="h-full">
                 <Link href={`/product/${product.id}`} >
                <Card className="h-full overflow-hidden bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-orange-100">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.isNew && <Badge className="absolute top-2 right-2 bg-orange-500">Nuevo</Badge>}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">{product.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{product.rating || 4.5}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 text-sm line-clamp-2 h-10">{product.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {product.tags &&
                        product.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-orange-50 text-orange-700 border-orange-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2">
                    <div className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <ShoppingCart className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                  </CardFooter>
                </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg text-center mt-8">
              <h2 className="text-xl font-bold text-orange-600 mb-2">No se encontraron resultados</h2>
              <p className="text-gray-800">No hay productos que coincidan con tu búsqueda.</p>
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={() => setSearchQuery("")}>
                Mostrar todos los productos
              </Button>
            </div>
          )}
        </div>
      </FadeInTransition>
    </div>
  )
}


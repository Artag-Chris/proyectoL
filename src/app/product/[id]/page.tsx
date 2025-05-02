"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Share2, Check, ChevronRight, Star, Truck, RefreshCw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/components/footer"
import { Navbar } from "@/components/components/navbar"
import useGetProductById from "@/hooks/useGetProductById"
import { useParams } from "next/navigation"
import useCartStore from "@/utils/store/cartStore"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import {colors, RELATED_PRODUCTS, REVIEWS, sizes} from "@/utils/dummy/dummy";


export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedColor, setSelectedColor] = useState("Amber")
  const [selectedSize, setSelectedSize] = useState("Medium")

  const { id } = useParams()
  const parsedId = id ? Number.parseInt(id as string, 10) : null
  const { data: product, isLoading } = useGetProductById(parsedId || 0)
  const addItem = useCartStore((state) => state.addItem)

  // Mock additional product images
  const productImages = product?.imageUrl
    ? [
        product.imageUrl,
        "/placeholder.svg?height=600&width=600&text=Image+2",
        "/placeholder.svg?height=600&width=600&text=Image+3",
        "/placeholder.svg?height=600&width=600&text=Image+4",
      ]
    : ["/placeholder.svg?height=600&width=600"]



  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        imageUrl: product.imageUrl || "/placeholder.svg",
      })

      setAddedToCart(true)

      toast({
        title: "¡Añadido al carrito!",
        description: `${quantity} x ${product.name} (${selectedSize}, ${selectedColor})`,
        action: (
          <Button variant="outline" size="sm" className="gap-1">
            Ver carrito <ChevronRight className="h-4 w-4" />
          </Button>
        ),
      })

      // Reset success animation after delay
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: product?.name,
    })
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Producto increíble",
        text: product?.description || "Mira este producto que encontré",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Enlace copiado",
        description: "El enlace del producto ha sido copiado al portapapeles",
      })
    }
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-pulse">
            <div className="aspect-square rounded-xl bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-white/50 backdrop-blur-sm border-y border-amber-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-amber-800">
            <span>Inicio</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Productos</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium truncate">{product?.name}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Images Section */}
            <div className="bg-gradient-to-br from-amber-100/50 to-orange-100/50 p-6 md:p-10">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={productImages[activeImageIndex] || "/placeholder.svg"}
                        alt={product?.name || "Product Image"}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Sale badge */}
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">-15%</Badge>
                </div>

                {/* Thumbnail gallery */}
                <div className="flex space-x-2 mt-4">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        activeImageIndex === index
                          ? "border-amber-500 shadow-md"
                          : "border-transparent hover:border-amber-300",
                      )}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-6 md:p-10">
              {product && (
                <div className="space-y-6">
                  {/* Product title and rating */}
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                        Producto destacado
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn("h-4 w-4", star <= 4 ? "text-amber-500 fill-amber-500" : "text-gray-300")}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4.0 (24 reseñas)</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through">${(product.price * 1.15).toFixed(2)}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                    {!product.description?.includes("aromática") &&
                      " Esta vela aromática está hecha a mano con cera de soja 100% natural y aceites esenciales. Perfecta para crear un ambiente relajante y acogedor en cualquier espacio."}
                  </p>

                  {/* Color selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                    <div className="flex gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                            selectedColor === color.name
                              ? "border-gray-900"
                              : "border-transparent hover:border-gray-300",
                          )}
                          onClick={() => setSelectedColor(color.name)}
                          aria-label={`Color ${color.name}`}
                        >
                          <span className={`w-6 h-6 rounded-full ${color.value}`}></span>
                          {selectedColor === color.name && <Check className="absolute h-3 w-3 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                      <button className="text-sm text-amber-600 hover:text-amber-800">Guía de tamaños</button>
                    </div>
                    <div className="flex gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all",
                            selectedSize === size
                              ? "bg-amber-100 text-amber-900 border-2 border-amber-300"
                              : "bg-gray-100 text-gray-900 border-2 border-transparent hover:bg-gray-200",
                          )}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10 rounded-md border-gray-300"
                      >
                        -
                      </Button>
                      <span className="text-xl font-medium text-gray-900 w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10 rounded-md border-gray-300"
                      >
                        +
                      </Button>
                      <span className="text-sm text-gray-500">
                        {(product?.stock ?? 0) > 10
                          ? "En stock"
                          : (product?.stock ?? 0) > 0
                            ? `Solo quedan ${product?.stock}`
                            : "Agotado"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className={cn(
                          "flex-1 text-base font-medium h-12 transition-all",
                          addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700",
                        )}
                        onClick={handleAddToCart}
                        disabled={addedToCart}
                      >
                        {addedToCart ? (
                          <>
                            <Check className="mr-2 h-5 w-5" />
                            Añadido
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Añadir al carrito
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-12 w-12 border-gray-300",
                          isFavorite && "text-red-500 border-red-200 bg-red-50",
                        )}
                        onClick={toggleFavorite}
                      >
                        <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500")} />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 border-gray-300"
                        onClick={shareProduct}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Truck className="h-5 w-5 text-amber-600" />
                      <span className="text-sm">Envío gratis</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <RefreshCw className="h-5 w-5 text-amber-600" />
                      <span className="text-sm">Devolución 30 días</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Shield className="h-5 w-5 text-amber-600" />
                      <span className="text-sm">Garantía 1 año</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {["description", "specifications", "reviews"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 capitalize text-base"
                >
                  {tab === "description" ? "Descripción" : tab === "specifications" ? "Especificaciones" : "Reseñas"}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose prose-amber max-w-none">
                <h3>Sobre este producto</h3>
                <p>
                  Nuestras velas aromáticas están hechas a mano con ingredientes de la más alta calidad. Utilizamos cera
                  de soja 100% natural, que es biodegradable y libre de toxinas, combinada con aceites esenciales puros
                  para crear fragancias duraderas y envolventes.
                </p>
                <p>
                  Cada vela está cuidadosamente elaborada para garantizar una combustión limpia y uniforme, con una
                  duración aproximada de 40-50 horas dependiendo del tamaño. El recipiente de vidrio reciclado puede
                  reutilizarse una vez consumida la vela.
                </p>
                <h4>Beneficios</h4>
                <ul>
                  <li>Cera de soja 100% natural y sostenible</li>
                  <li>Aceites esenciales puros sin productos químicos</li>
                  <li>Mecha de algodón libre de plomo</li>
                  <li>Combustión limpia sin hollín</li>
                  <li>Envase reutilizable y reciclable</li>
                  <li>Elaboración artesanal local</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Detalles técnicos</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Material", value: "Cera de soja 100% natural" },
                      { label: "Fragancia", value: "Aceites esenciales" },
                      { label: "Mecha", value: "Algodón orgánico" },
                      { label: "Recipiente", value: "Vidrio reciclado" },
                      { label: "Tiempo de combustión", value: "40-50 horas (tamaño mediano)" },
                      { label: "Peso", value: "250g (tamaño mediano)" },
                      { label: "Dimensiones", value: "8 x 8 x 10 cm (tamaño mediano)" },
                    ].map((spec, i) => (
                      <div key={i} className="flex">
                        <span className="w-1/3 font-medium text-gray-700">{spec.label}:</span>
                        <span className="w-2/3 text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Instrucciones de uso</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Para obtener el mejor rendimiento de su vela aromática, siga estas recomendaciones:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>
                        En el primer uso, deje que la vela se queme durante al menos 2 horas para que la cera se derrita
                        uniformemente.
                      </li>
                      <li>Recorte la mecha a 5mm antes de cada uso para evitar que produzca hollín.</li>
                      <li>No deje la vela encendida por más de 4 horas seguidas.</li>
                      <li>Mantenga la vela alejada de corrientes de aire.</li>
                      <li>No deje la vela desatendida mientras está encendida.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Reseñas de clientes</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn("h-5 w-5", star <= 4 ? "text-amber-500 fill-amber-500" : "text-gray-300")}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">Basado en 24 reseñas</span>
                    </div>
                  </div>

                  <Button className="bg-amber-600 hover:bg-amber-700">Escribir una reseña</Button>
                </div>

                <Separator />

                {/* Review list */}
                <div className="space-y-6">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{review.author}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-amber-100"
              >
                <div className="relative aspect-square bg-amber-50">
                  <Image
                    src={relatedProduct.imageUrl || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 text-gray-900">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-amber-600 font-semibold">${relatedProduct.price}</p>
                    <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


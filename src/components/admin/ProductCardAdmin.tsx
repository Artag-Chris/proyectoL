"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { Eye, ShoppingBag, Tag, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Definimos una interfaz para el tipo de producto
export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category?: string
  stock?: number
  isAvailable?: boolean
  discount?: number
  tags?: string[]
}

interface ProductCardAdminProps {
  product: any
}

export function ProductCardAdmin({ product }: ProductCardAdminProps) {
  // Estado local para manejar la disponibilidad
  const [isAvailable, setIsAvailable] = useState(product.isAvailable ?? true)
  const [isUpdating, setIsUpdating] = useState(false)

  // Función para actualizar la disponibilidad directamente con la API
  const handleAvailabilityToggle = async () => {
    const newState = !isAvailable
    setIsUpdating(true)

    try {
      // Llamada a la API para actualizar el estado
      const response = await fetch(`/api/products/${product.id}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAvailable: newState }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la disponibilidad")
      }

      // Actualizar el estado local después de una actualización exitosa
      setIsAvailable(newState)
      toast.success(`Producto ${newState ? "activado" : "desactivado"} correctamente`)
    } catch (error) {
      console.error("Error:", error)
      toast.error("No se pudo actualizar el estado del producto")
      // No actualizamos el estado local si hay un error
    } finally {
      setIsUpdating(false)
    }
  }

  // Calcular precio con descuento si existe
  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group relative h-full overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md",
          "transition-all duration-300 hover:shadow-lg",
          isAvailable ? "ring-1 ring-white/20 hover:ring-primary/30" : "grayscale-[30%] ring-1 ring-white/10",
        )}
      >
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        {/* Contenido de la tarjeta */}
        <div className="relative h-full flex flex-col">
          {/* Imagen del producto con overlay */}
          <div className="relative h-48 overflow-hidden">
            <Link href={`/admin/products/${product.id}`} className="block h-full">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-700 group-hover:scale-110",
                  !isAvailable && "opacity-70",
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay con degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            {/* Botón de ver detalles (aparece al hacer hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link href={`/admin/products/${product.id}`} passHref>
                <Button variant="secondary" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Ver detalles
                </Button>
              </Link>
            </div>

            {/* Badges de categoría y descuento */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.category && (
                <Badge variant="outline" className="bg-black/50 text-white border-none">
                  {product.category}
                </Badge>
              )}
              {product.discount && <Badge className="bg-red-500 hover:bg-red-600">{product.discount}% OFF</Badge>}
            </div>
          </div>

          {/* Contenido de texto */}
          <div className="flex flex-col flex-grow p-4">
            <Link href={`/admin/products/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg text-[var(--color-text)] line-clamp-2 mb-1">{product.name}</h3>
            </Link>

            {/* Etiquetas */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {product.tags.map((tag:any) => (
                  <div key={tag} className="flex items-center text-xs text-[var(--color-text)]/70">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Información de stock */}
            <div className="flex items-center text-sm text-[var(--color-text)]/70 mt-1 mb-2">
              <Package className="h-4 w-4 mr-1" />
              {product.stock ? `${product.stock} en stock` : "Sin stock"}
            </div>

            {/* Espacio flexible para empujar el precio y el switch al fondo */}
            <div className="flex-grow" />

            {/* Precio y disponibilidad */}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
              <div className="flex items-end gap-1">
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-1 text-[var(--color-text)]/70" />
                  {discountedPrice ? (
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[var(--color-text)]">${discountedPrice.toFixed(2)}</span>
                      <span className="text-xs line-through text-[var(--color-text)]/50">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-[var(--color-text)]">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {/* Switch de disponibilidad */}
              <div className="flex items-center gap-2">
                <span
                  className={cn("text-xs font-medium", isAvailable ? "text-green-500" : "text-[var(--color-text)]/50")}
                >
                  {isAvailable ? "Disponible" : "No disponible"}
                </span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleAvailabilityToggle}
                  className={cn("data-[state=checked]:bg-green-500", isUpdating && "opacity-50 cursor-not-allowed")}
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

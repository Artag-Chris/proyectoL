"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Tag, Package, CheckCircle2, MinusCircle, PlusCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

interface SelectableProductCardProps {
  product: Product
  isSelected: boolean
  quantity: number
  onSelect: (product: Product) => void
  onQuantityChange: (product: Product, quantity: number) => void
}

export function SelectableProductCard({
  product,
  isSelected,
  quantity,
  onSelect,
  onQuantityChange,
}: SelectableProductCardProps) {
  // Calcular precio con descuento si existe
  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : null
  const finalPrice = discountedPrice || product.price

  // Manejar cambios de cantidad
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.stock && quantity < product.stock) {
      onQuantityChange(product, quantity + 1)
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (quantity > 1) {
      onQuantityChange(product, quantity - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const newQuantity = Number.parseInt(e.target.value) || 1
    const maxQuantity = product.stock || 999
    const validQuantity = Math.min(Math.max(1, newQuantity), maxQuantity)
    onQuantityChange(product, validQuantity)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        onClick={() => onSelect(product)}
        className={cn(
          "group relative h-full overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md",
          "transition-all duration-300 hover:shadow-lg cursor-pointer",
          isSelected ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-white/20 hover:ring-primary/30",
        )}
      >
        {/* Efecto de brillo en las esquinas */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur transition duration-500",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        />

        {/* Indicador de selección */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
        )}

        {/* Contenido de la tarjeta */}
        <div className="relative h-full flex flex-col">
          {/* Imagen del producto con overlay */}
          <div className="relative h-48 overflow-hidden">
            <div className="block h-full">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay con degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            <h3 className="font-semibold text-lg text-[var(--color-text)] line-clamp-2 mb-1">{product.name}</h3>

            {/* Etiquetas */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {product.tags.map((tag) => (
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

            {/* Espacio flexible para empujar el precio y controles al fondo */}
            <div className="flex-grow" />

            {/* Precio y controles de cantidad */}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
              <div className="flex items-end gap-1">
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-1 text-[var(--color-text)]/70" />
                  {discountedPrice ? (
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[var(--color-text)]">${finalPrice.toFixed(2)}</span>
                      <span className="text-xs line-through text-[var(--color-text)]/50">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-[var(--color-text)]">${finalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {/* Controles de cantidad (solo visibles cuando está seleccionado) */}
              {isSelected && (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-14 h-7 text-center p-0"
                    min={1}
                    max={product.stock || 999}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleIncrement}
                    disabled={product.stock !== undefined && quantity >= product.stock}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

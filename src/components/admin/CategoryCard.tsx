"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Pencil, Trash2, Tag, Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Category {
  id: number | string
  name: string
  description?: string
  isAvailable: boolean
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isAvailable, setIsAvailable] = useState(category.isAvailable)
  const [isUpdating, setIsUpdating] = useState(false)

  // Función para actualizar la disponibilidad directamente con la API
  const handleAvailabilityToggle = async () => {
    const newState = !isAvailable
    setIsUpdating(true)

    try {
      // Llamada a la API para actualizar el estado
      const response = await fetch(`http://localhost:45623/api/productos/category/update/${category.id}`, { // Updated to use category.id
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
      toast.success(`Categoría ${newState ? "activada" : "desactivada"} correctamente`)
    } catch (error) {
      console.error("Error:", error)
      toast.error("No se pudo actualizar el estado de la categoría")
      // No actualizamos el estado local si hay un error
    } finally {
      setIsUpdating(false)
    }
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
        className={cn(
          "h-full overflow-hidden border-0 transition-all duration-300",
          "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md",
          "hover:shadow-lg relative group",
          isAvailable ? "ring-1 ring-white/20 hover:ring-primary/30" : "grayscale-[30%] ring-1 ring-white/10",
        )}
      >
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="relative p-6 flex flex-col h-full">
          {/* Cabecera con nombre y badge de estado */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-[var(--color-text)] line-clamp-1">{category.name}</h3>
            </div>
            <Badge
              variant={isAvailable ? "default" : "outline"}
              className={cn("ml-auto", isAvailable ? "bg-green-500/80 hover:bg-green-500" : "text-muted-foreground")}
            >
              {isAvailable ? "Activa" : "Inactiva"}
            </Badge>
          </div>

          {/* Descripción */}
          <p className="text-[var(--color-text)]/70 mb-6 line-clamp-3 flex-grow">
            {category.description || "Sin descripción"}
          </p>

          {/* Acciones */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button size="sm" variant="outline" className="h-9 w-9 p-0 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </div>

            {/* Toggle de disponibilidad */}
            <div className="flex items-center gap-2">
              <span
                className={cn("text-xs font-medium", isAvailable ? "text-green-500" : "text-[var(--color-text)]/50")}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isAvailable ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
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
      </Card>
    </motion.div>
  )
}

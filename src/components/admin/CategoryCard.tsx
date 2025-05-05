"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Pencil, Trash2, Tag, Check, X, Loader2, Save, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

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
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(category.description || "")

  const handleUpdateCategory = async (newDescription?: string) => {
    setIsUpdating(true)
    const payload = {
      isAvailable,
      description: newDescription || editedDescription
    }

    try {
      const response = await fetch(`http://localhost:45623/api/productos/category/update/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Error al actualizar la categoría")

      toast.success("Categoría actualizada correctamente")
      setIsEditing(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error("No se pudo actualizar la categoría")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedDescription(category.description || "")
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
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="relative p-6 flex flex-col h-full">
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

          {/* Área de descripción editable */}
          <div className="mb-6 flex-grow">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="bg-white/10 border-white/20 text-[var(--color-text)]"
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="h-8 gap-1"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateCategory()}
                    disabled={isUpdating}
                    className="h-8 gap-1"
                  >
                    {isUpdating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    Guardar
                  </Button>
                </div>
              </div>
            ) : (
              <p 
                className="text-[var(--color-text)]/70 line-clamp-3 cursor-text"
                onClick={() => setIsEditing(true)}
              >
                {editedDescription || "Sin descripción"}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-9 w-9 p-0"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
                <span className="sr-only">Editar</span>
              </Button>
              <Button size="sm" variant="outline" className="h-9 w-9 p-0 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </div>

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
                onCheckedChange={(checked) => {
                  setIsAvailable(checked)
                  handleUpdateCategory()
                }}
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
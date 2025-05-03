"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import PageTransition from "@/components/transitions/PageTransition"
import useGetCategories from "@/hooks/useGetCategory"
import { CategoryCard } from "@/components/admin/CategoryCard"
import { FolderPlus, Loader2, Plus, Search, Tag } from "lucide-react"
import { toast } from "sonner"

export default function CategoriesPage() {
  const {
    data: { categories = [] } = {},
    loading,
    error,
  } = useGetCategories()
  const [addCategory, setAddCategory] = useState(categories)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isAvailable: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setAddCategory(categories)
  }, [categories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:45623/api/productos/createcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        throw new Error("Error al crear la categoría")
      }

      const data = await response.json()

      // Añadir la nueva categoría a la lista local
      setAddCategory([...addCategory, { ...newCategory, id: data.id || addCategory.length + 1 }])

      // Resetear el formulario
      setNewCategory({ name: "", description: "", isAvailable: true })

      // Notificar éxito
      toast.success("Categoría creada correctamente")
    } catch (error) {
      console.error(error)
      toast.error("Error al crear la categoría")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtrar categorías por término de búsqueda
  const filteredCategories = addCategory.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium text-[var(--color-text)]">Cargando categorías...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-red-600 dark:text-red-400">Error al cargar categorías</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{error}</p>
            <Button className="mt-4 w-full" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Encabezado con título y contador */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Tag className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Categorías</h1>
            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
              {addCategory.length}
            </Badge>
          </div>

          {/* Buscador */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/50 border-none"
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Grid de categorías */}
        {filteredCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron categorías que coincidan con "{searchTerm}"
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Mostrar todas las categorías
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No hay categorías disponibles</p>
          </div>
        )}

        {/* Formulario para crear nueva categoría */}
        <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl mt-10">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-2xl font-semibold text-[var(--color-text)] flex items-center gap-2">
              <FolderPlus className="h-6 w-6 text-primary" />
              Crear Nueva Categoría
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base text-[var(--color-text)]">
                    Nombre de la Categoría
                  </Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                    placeholder="Ej: Electrónica, Ropa, Accesorios..."
                    className="bg-white/50 text-[var(--color-text)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isAvailable" className="text-base text-[var(--color-text)] block mb-3">
                    Estado de la Categoría
                  </Label>
                  <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-md">
                    <Switch
                      id="isAvailable"
                      checked={newCategory.isAvailable}
                      onCheckedChange={(checked) => setNewCategory({ ...newCategory, isAvailable: checked })}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <Label htmlFor="isAvailable" className="text-[var(--color-text)] font-medium">
                      {newCategory.isAvailable ? "Disponible" : "No disponible"}
                    </Label>
                    <Badge
                      variant={newCategory.isAvailable ? "default" : "outline"}
                      className={newCategory.isAvailable ? "bg-green-500" : "text-muted-foreground ml-auto"}
                    >
                      {newCategory.isAvailable ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base text-[var(--color-text)]">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Describe brevemente esta categoría de productos..."
                  className="bg-white/50 text-[var(--color-text)] min-h-[120px]"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="min-w-[150px]" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Crear Categoría
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

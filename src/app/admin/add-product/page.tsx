"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import useGetCategories from "@/hooks/useGetCategory"
import { Check, ImagePlus, Info, Loader2, PackageOpen, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [desCategory, setDesCategory] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const { data, loading, error } = useGetCategories()

  useEffect(() => {
    if (data && data.categories.length > 0 && !category) {
      setCategory(data.categories[0].name)
    }
  }, [data, category])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("desCategory", desCategory)
    formData.append("stock", stock)
    if (image) {
      formData.append("file", image)
    }

    try {
      const response = await fetch("http://localhost:45623/api/productos/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      // Formato más amigable para el modal
      const formattedResponse = {
        status: response.ok ? "Éxito" : "Error",
        message: data.message || "Producto agregado correctamente",
        productId: data.id || "N/A",
        details: data,
      }

      setModalContent(JSON.stringify(formattedResponse, null, 2))
      setIsModalOpen(true)

      if (response.ok) {
        toast.success("Producto agregado correctamente")
        setName("")
        setDescription("")
        setPrice("")
        setCategory(data.categories?.[0]?.name || "")
        setDesCategory("")
        setStock("")
        setImage(null)
        setImagePreview(null)
      } else {
        toast.error("Error al agregar el producto")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      setModalContent(
        JSON.stringify(
          {
            status: "Error",
            message: "Error al conectar con el servidor",
            details: error,
          },
          null,
          2,
        ),
      )
      setIsModalOpen(true)
      toast.error("Error al conectar con el servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Cargando categorías...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <X className="h-5 w-5" />
              Error al cargar categorías
            </CardTitle>
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />
      <FadeInTransition position="bottom">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Columna izquierda - Formulario */}
            <div className="flex-1">
              <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <PackageOpen className="h-6 w-6 text-primary" />
                      Agregar Nuevo Producto
                    </CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Nuevo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="details">Detalles del Producto</TabsTrigger>
                      <TabsTrigger value="category">Categoría e Inventario</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <TabsContent value="details" className="space-y-6 mt-0">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-base">
                            Nombre del Producto
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/50"
                            placeholder="Ej: Camiseta Premium de Algodón"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-base">
                            Descripción
                          </Label>
                          <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white/50 min-h-[120px]"
                            placeholder="Describe las características y beneficios del producto..."
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-base">
                            Precio
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="bg-white/50 pl-7"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image" className="text-base flex items-center gap-2">
                            <ImagePlus className="h-4 w-4" />
                            Imagen del Producto
                          </Label>
                          <div className="bg-white/50 border rounded-md p-4">
                            <Input
                              id="image"
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={handleImageChange}
                              className="bg-white"
                              required
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Formatos aceptados: JPG, JPEG, PNG. Tamaño máximo: 5MB.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="category" className="space-y-6 mt-0">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-base flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Categoría
                          </Label>
                          <Select onValueChange={setCategory} value={category} required>
                            <SelectTrigger className="bg-white/50">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {data?.categories?.map((cat) => (
                                <SelectItem key={cat.id || "default-id"} value={cat.name || "default-name"}>
                                  {cat.name || "Default Name"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="desCategory" className="text-base">
                            Descripción de Categoría
                          </Label>
                          <Textarea
                            id="desCategory"
                            value={desCategory}
                            onChange={(e) => setDesCategory(e.target.value)}
                            className="bg-white/50"
                            placeholder="Breve descripción de la categoría..."
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="stock" className="text-base">
                            Stock Disponible
                          </Label>
                          <Input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="bg-white/50"
                            placeholder="Cantidad disponible"
                            required
                          />
                        </div>
                      </TabsContent>

                      <Separator className="my-6" />

                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                          Cancelar
                        </Button>
                        <Button type="submit" className="min-w-[120px]" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Guardar Producto
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Columna derecha - Previsualización */}
            <div className="w-full md:w-[350px]">
              <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl sticky top-6">
                <CardHeader className="pb-4 border-b">
                  <CardTitle className="text-lg font-medium">Vista Previa</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {imagePreview ? (
                    <div className="space-y-6">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Vista previa"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-lg line-clamp-1">{name || "Nombre del producto"}</h3>
                          <p className="text-primary text-xl font-bold">${Number(price || 0).toFixed(2)}</p>
                        </div>

                        {category && (
                          <Badge variant="outline" className="bg-primary/10">
                            {category}
                          </Badge>
                        )}

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {description || "Descripción del producto..."}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1",
                              Number(stock) > 0 ? "text-green-600" : "text-red-600",
                            )}
                          >
                            {Number(stock) > 0 ? (
                              <>
                                <Check className="h-4 w-4" />
                                En stock
                              </>
                            ) : (
                              <>
                                <X className="h-4 w-4" />
                                Sin stock
                              </>
                            )}
                          </span>
                          {Number(stock) > 0 && <span className="text-muted-foreground">({stock} unidades)</span>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] border border-dashed rounded-lg bg-muted/30">
                      <ImagePlus className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Sube una imagen para ver la previsualización del producto
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FadeInTransition>

      {/* Modal mejorado */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Info className="h-5 w-5 text-primary" />
              Respuesta del Servidor
            </DialogTitle>
            <DialogDescription>Detalles de la respuesta recibida tras procesar la solicitud</DialogDescription>
          </DialogHeader>

          <div className="bg-muted/30 border rounded-md p-4 max-h-[400px] overflow-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">{modalContent}</pre>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

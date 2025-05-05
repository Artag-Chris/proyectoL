"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Trash2, ChevronLeft, AlertCircle, Loader2, Plus, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useGetProductById from "@/hooks/useGetProductById"
import useGetCategories from "@/hooks/useGetCategory"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ProductImage {
  id?: number
  url: string
  productId?: number
  isNew?: boolean
  file?: File
}

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const parsedId = id ? Number.parseInt(id as string, 10) : null

  const { data: product, isLoading: isLoadingProduct } = useGetProductById(parsedId || 0)
  const { data: categoriesData, loading: isLoadingCategories } = useGetCategories()

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    isAvailable: true,
    categoryId: 0,
  })

  // Estado para imágenes
  const [images, setImages] = useState<ProductImage[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Estados para UI
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cargar datos del producto cuando estén disponibles
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        isAvailable: product.isAvailable !== undefined ? product.isAvailable : true,
        categoryId: product.categoryId || 0,
      })

      // Inicializar imágenes
      const productImages: ProductImage[] = []

      // Añadir la imagen principal si existe
      if (product.imageUrl) {
        productImages.push({
          id: 0, // ID temporal para la imagen principal
          url: product.imageUrl,
          productId: product.id,
        })
      }

      // Añadir imágenes adicionales si existen
      // if (product.images && product.images.length > 0) {
      //   productImages.push(...product.images)
      // }

      setImages(productImages)
    }
  }, [product])

  // Detectar cambios en el formulario
  useEffect(() => {
    if (product) {
      const hasFormChanges =
        formData.name !== product.name ||
        formData.description !== product.description ||
        formData.price !== product.price ||
        formData.stock !== product.stock ||
        formData.isAvailable !== product.isAvailable ||
        formData.categoryId !== product.categoryId

      const hasImageChanges = images.some((img) => img.isNew)

      setHasChanges(hasFormChanges || hasImageChanges)
    }
  }, [formData, images, product])

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))

    // Limpiar error si el campo se está editando
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Manejar cambio en el switch de disponibilidad
  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: checked,
    }))
  }

  // Manejar cambio de categoría
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: Number.parseInt(value, 10),
    }))
  }

  // Manejar subida de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: ProductImage[] = []

    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file)
      newImages.push({
        url: imageUrl,
        productId: parsedId || 0,
        isNew: true,
        file,
      })
    })

    setImages((prev) => [...prev, ...newImages])
    setActiveImageIndex(images.length) // Seleccionar la primera imagen nueva

    // Resetear el input
    e.target.value = ""
  }

  // Eliminar una imagen
  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      newImages.splice(index, 1)
      return newImages
    })

    // Ajustar el índice activo si es necesario
    if (activeImageIndex >= images.length - 1) {
      setActiveImageIndex(Math.max(0, images.length - 2))
    }
  }

  // Validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del producto es obligatorio"
    }

    if (formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor que 0"
    }

    if (formData.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo"
    }

    if (formData.categoryId <= 0) {
      newErrors.categoryId = "Debes seleccionar una categoría"
    }

    if (images.length === 0) {
      newErrors.images = "El producto debe tener al menos una imagen"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Guardar cambios
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Por favor, corrige los errores antes de guardar")
      return
    }

    setIsSaving(true)

    try {
      // Primero subimos las imágenes nuevas
      const uploadPromises = images
        .filter((img) => img.isNew && img.file)
        .map(async (img) => {
          const formData = new FormData()
          formData.append("file", img.file as File)

          const response = await fetch(`http://localhost:45623/api/productos/${parsedId}/images/upload`, {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Error al subir la imagen")
          }

          return await response.json()
        })

      // Esperar a que todas las imágenes se suban
      await Promise.all(uploadPromises)

      // Actualizar el producto
      const response = await fetch(`http://localhost:45623/api/productos/${parsedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          isAvailable: formData.isAvailable,
          categoryId: formData.categoryId,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar el producto")
      }

      toast.success("Producto actualizado correctamente")
      setHasChanges(false)

      // Redirigir a la página de detalles después de un breve retraso
      setTimeout(() => {
        router.push(`/admin/products/${parsedId}`)
      }, 1500)
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error("Error al guardar los cambios")
    } finally {
      setIsSaving(false)
    }
  }

  // Eliminar producto
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:45623/api/productos/${parsedId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el producto")
      }

      toast.success("Producto eliminado correctamente")

      // Redirigir a la lista de productos
      router.push("/admin/products")
    } catch (error) {
      console.error("Error al eliminar:", error)
      toast.error("Error al eliminar el producto")
    } finally {
      setShowDeleteDialog(false)
    }
  }

  // Cancelar edición
  const handleCancel = () => {
    if (hasChanges) {
      setShowDiscardDialog(true)
    } else {
      router.back()
    }
  }

  // Mostrar estado de carga
  if (isLoadingProduct || isLoadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-xl font-medium">Cargando producto...</p>
        </div>
      </div>
    )
  }

  // Si no se encuentra el producto
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <h2 className="text-2xl font-bold">Producto no encontrado</h2>
              <p className="text-muted-foreground">No se ha podido encontrar el producto que estás buscando.</p>
              <Button onClick={() => router.push("/admin/products")}>Volver a productos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleCancel} className="h-10 w-10 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Editar Producto</h1>
            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
              ID: {parsedId}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Columna izquierda - Imágenes */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Imágenes del Producto</h2>

                {/* Imagen principal */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white border">
                  {images.length > 0 ? (
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
                          src={images[activeImageIndex]?.url || "/placeholder.svg"}
                          alt="Vista previa"
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-16 w-16 mb-2" />
                      <p>No hay imágenes</p>
                    </div>
                  )}
                </div>

                {/* Galería de miniaturas */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <button
                        className={cn(
                          "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                          activeImageIndex === index
                            ? "border-primary shadow-md"
                            : "border-transparent hover:border-primary/50",
                        )}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <Image
                          src={img.url || "/placeholder.svg"}
                          alt={`Miniatura ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {img.isNew && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Badge className="bg-primary text-[10px]">Nuevo</Badge>
                          </div>
                        )}
                      </button>
                      <button
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {/* Botón para añadir imagen */}
                  <label
                    className={cn(
                      "w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer",
                      "hover:border-primary/50 hover:bg-primary/5 transition-colors",
                      errors.images ? "border-red-500 bg-red-50" : "border-gray-300",
                    )}
                  >
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={handleImageUpload}
                      multiple
                    />
                    <Plus className="h-5 w-5 text-gray-400" />
                  </label>
                </div>

                {errors.images && <p className="text-sm text-red-500 mt-2">{errors.images}</p>}

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Formatos aceptados: JPG, JPEG, PNG. Tamaño máximo: 5MB.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    La primera imagen será la principal del producto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:col-span-3">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="details">Detalles del Producto</TabsTrigger>
                    <TabsTrigger value="inventory">Inventario y Categoría</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6 mt-0">
                    {/* Nombre del producto */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
                        Nombre del Producto *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn("bg-white", errors.name && "border-red-500")}
                        placeholder="Ej: Camiseta Premium de Algodón"
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="bg-white min-h-[150px]"
                        placeholder="Describe las características y beneficios del producto..."
                      />
                    </div>

                    {/* Precio */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className={cn(errors.price && "text-red-500")}>
                        Precio *
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          className={cn("bg-white pl-7", errors.price && "border-red-500")}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                    </div>
                  </TabsContent>

                  <TabsContent value="inventory" className="space-y-6 mt-0">
                    {/* Stock */}
                    <div className="space-y-2">
                      <Label htmlFor="stock" className={cn(errors.stock && "text-red-500")}>
                        Stock *
                      </Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        className={cn("bg-white", errors.stock && "border-red-500")}
                        placeholder="Cantidad disponible"
                      />
                      {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                    </div>

                    {/* Categoría */}
                    <div className="space-y-2">
                      <Label htmlFor="categoryId" className={cn(errors.categoryId && "text-red-500")}>
                        Categoría *
                      </Label>
                      <Select value={formData.categoryId.toString()} onValueChange={handleCategoryChange}>
                        <SelectTrigger className={cn("bg-white", errors.categoryId && "border-red-500")}>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId}</p>}
                    </div>

                    {/* Disponibilidad */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isAvailable">Disponibilidad</Label>
                        <Switch
                          id="isAvailable"
                          checked={formData.isAvailable}
                          onCheckedChange={handleAvailabilityChange}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.isAvailable
                          ? "El producto está visible y disponible para compra"
                          : "El producto está oculto y no disponible para compra"}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator className="my-6" />

                {/* Información adicional */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Información adicional</h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-muted-foreground">ID del Producto</span>
                      <span>{product.id}</span>
                    </div>
                    <div>
                      <span className="block text-muted-foreground">Fecha de Creación</span>
                      <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'No disponible'}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving || !hasChanges} className="min-w-[150px]">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">¿Eliminar producto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-4 border rounded-lg bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">Se eliminarán todas las imágenes y datos asociados a este producto.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar Producto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para descartar cambios */}
      <Dialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Descartar cambios?</DialogTitle>
            <DialogDescription>Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiscardDialog(false)}>
              Seguir editando
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setShowDiscardDialog(false)
                router.back()
              }}
            >
              Descartar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

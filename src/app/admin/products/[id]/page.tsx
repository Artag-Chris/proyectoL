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
import { handleSave } from "@/utils/functions/handleProductAdminsave"
import { handleCancel, handleRemoveImage, handleImageUpload, handleChange, handleCategoryChange, handleAvailabilityChange, handleDelete } from "@/utils/functions/handleProductAdminMethods"
import HeaderEdit from "@/components/admin/editProduct/HeaderEdit"
import LeftColumnImageComponent from "@/components/admin/editProduct/LeftColumnImageComponent"

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
        <HeaderEdit
          parsedId={parsedId!}
          handleCancel={(hasChanges, setShow) => handleCancel(hasChanges, setShowDiscardDialog)}
          handleSave={() => handleSave(formData, images, setIsSaving, setErrors, setHasChanges, parsedId || 0)}
          handleDelete={() => handleDelete(parsedId!, setShowDeleteDialog)}
          setShowDeleteDialog={setShowDeleteDialog}
          setShowDiscardDialog={setShowDiscardDialog}
          setIsSaving={setIsSaving}
          setErrors={setErrors}
          setHasChanges={setHasChanges}
          formData={formData}
          images={images}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Columna izquierda - Imágenes */}
          <LeftColumnImageComponent 
            images={images} 
            activeImageIndex={activeImageIndex} 
            setActiveImageIndex={setActiveImageIndex} 
            setImages={setImages} 
            errors={errors} 
            parsedId={parsedId!} 
          />

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
                        onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
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
                        onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
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
                          onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
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
                        onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
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
                      <Select value={formData.categoryId.toString()} onValueChange={(value) => handleCategoryChange(value, setFormData,)}>
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
                          onCheckedChange={(checked) => handleAvailabilityChange(checked, setFormData)}
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
                  <Button variant="outline" onClick={() => handleCancel(hasChanges, setShowDiscardDialog)} className="min-w-[150px]">
                    Cancelar
                  </Button>
                  <Button onClick={() => handleSave(formData, images, setIsSaving, setErrors, setHasChanges, parsedId ? parsedId : 0)} disabled={isSaving || !hasChanges} className="min-w-[150px]">
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
            <Button variant="destructive" onClick={() => handleDelete(parsedId!, setShowDeleteDialog)} className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
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

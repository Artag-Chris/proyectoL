"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useGetProductById from "@/hooks/useGetProductById"
import useGetCategories from "@/hooks/useGetCategory"
import { handleSave } from "@/utils/functions/handleProductAdminsave"
import { handleCancel, handleChange, handleCategoryChange, handleAvailabilityChange, handleDelete } from "@/utils/functions/handleProductAdminMethods"
import HeaderEdit from "@/components/admin/editProduct/HeaderEdit"
import LeftColumnImageComponent from "@/components/admin/editProduct/LeftColumnImageComponent"
import RightColumnFormComponent from "@/components/admin/editProduct/RigtColumnFormComponent"
import DeleteDialog from "@/components/admin/editProduct/DeleteDialog"
import UndoneChangesDialog from "@/components/admin/editProduct/UndoneChangesDialog"

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
          <RightColumnFormComponent
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleAvailabilityChange={handleAvailabilityChange}
            handleSave={() => handleSave}
            handleCancel={() => handleCancel(hasChanges, setShowDiscardDialog)}
            categoriesData={categoriesData}
            product={product}
            isSaving={isSaving}
            hasChanges={hasChanges}
            setFormData={setFormData}
            setErrors={setErrors}
          />
        </div>
      </div>

      {/* Diálogo de confirmación para eliminar */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={(productId) => handleDelete(productId, setShowDeleteDialog)}
        productId={parsedId!}
      />

      {/* Diálogo de confirmación para descartar cambios */}
      <UndoneChangesDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}
        onConfirm={() => router.back()} // o tu lógica para descartar cambios
      />
    </div>
  )
}

import router from "next/router"
import { toast } from "sonner"

 // Manejar cambios en los campos del formulario
 export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFormData: React.Dispatch<React.SetStateAction<any>>, setErrors: React.Dispatch<React.SetStateAction<any>>, errors: any) => {
    const { name, value, type } = e.target

    setFormData((prev:any) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))

    // Limpiar error si el campo se está editando
    if (errors[name]) {
      setErrors((prev:any) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Manejar cambio en el switch de disponibilidad
 export const handleAvailabilityChange = (checked: boolean, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    setFormData((prev:any) => ({
      ...prev,
      isAvailable: checked,
    }))
  }

  // Manejar cambio de categoría
 export const handleCategoryChange = (value: string, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    setFormData((prev:any) => ({
      ...prev,
      categoryId: Number.parseInt(value, 10),
    }))
  }

  // Manejar subida de imágenes
 export const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImages: React.Dispatch<React.SetStateAction<any[]>>, setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>, parsedId: number | undefined, images: any[]) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: any[] = []

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
 export const handleRemoveImage = (index: number, setImages: React.Dispatch<React.SetStateAction<any[]>>, setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>, activeImageIndex: number, images: any[]) => {
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

 

  // Eliminar producto
 export const handleDelete = async (parsedId:number, setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
    //Todo no se aplicara un borrado fisico solo soft delete
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
 export const handleCancel = (hasChanges: boolean, setShowDiscardDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (hasChanges) {
      setShowDiscardDialog(true)
    } else {
      router.back()
    }
  }

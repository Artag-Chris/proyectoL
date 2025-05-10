import router from "next/router"
import { toast } from "sonner"

// Guardar cambios
export const handleSave = async (formData:any, images:any[], setIsSaving:Function, setErrors:Function, setHasChanges:Function, parsedId:number) => {

    //Todo aun no implementado pero necesitaremos crear una ruta para subir las otras imagenes especificas
    if (!validateForm(formData, setErrors, images)) {
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
      const response = await fetch(`http://localhost:45623/api/productos/update/${parsedId}`, {
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
     
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error("Error al guardar los cambios")
    } finally {
      setIsSaving(false)
    }
  }

  // Validar el formulario
  const validateForm = (formData:any, setErrors:Function, images:any[]) => {
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
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PageTransition from '@/components/transitions/PageTransition'
import { FadeInTransition } from '@/components/transitions/FadeIn'
import useGetCategories from '@/hooks/useGetCategory'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [desCategory, setDesCategory] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const {data: {categories}}= useGetCategories()

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

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('desCategory', desCategory)
    formData.append('stock', stock)
    if (image) {
      formData.append('file', image)
    }

    try {
      const response = await fetch('http://localhost:45623/api/productos/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setModalContent(JSON.stringify(data, null, 2))
      setIsModalOpen(true)

      if (response.ok) {
        // Limpiar el formulario después de un envío exitoso
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
        setDesCategory('')
        setStock('')
        setImage(null)
        setImagePreview(null)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      setModalContent('Error al agregar el producto. Por favor, intente de nuevo.')
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
      <PageTransition />
      <FadeInTransition position="right">
        <Card className="w-full max-w-2xl backdrop-blur-md bg-white/30 border-none shadow-lg">
          <CardHeader>
            <CardTitle>Agregar Nuevo Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={categories.indexOf(cat)} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desCategory">Descripción de Categoría</Label>
                <Input
                  id="desCategory"
                  value={desCategory}
                  onChange={(e) => setDesCategory(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Imagen del Producto</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  required
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <Label>Vista previa de la imagen</Label>
                  <div className="relative w-full h-64 mt-2 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Vista previa"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full">
                Agregar Producto
              </Button>
            </form>
          </CardContent>
        </Card>
      </FadeInTransition>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respuesta del Servidor</DialogTitle>
            <DialogDescription>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {modalContent}
              </pre>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

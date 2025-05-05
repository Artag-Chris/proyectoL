import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { handleRemoveImage, handleImageUpload } from '@/utils/functions/handleProductAdminMethods'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, Badge, X, Plus } from 'lucide-react'
import React from 'react'
import Image from "next/image"

interface LeftColumnImageComponentProps {
    images: any[];
    activeImageIndex: number;
    setActiveImageIndex: any
    setImages: any;
    errors: any;
    parsedId: string | number;  
}

function LeftColumnImageComponent({ images, activeImageIndex, setActiveImageIndex, setImages, errors, parsedId }: LeftColumnImageComponentProps) {
    return (
        <>
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
                        onClick={() => handleRemoveImage(index, setImages, setActiveImageIndex, activeImageIndex, images)}
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
                      onChange={(e) => handleImageUpload(e, setImages, setActiveImageIndex, typeof parsedId === 'string' ? parseInt(parsedId) : parsedId, images)}
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
        </>
    )
}

export default LeftColumnImageComponent
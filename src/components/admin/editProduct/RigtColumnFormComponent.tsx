import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RightColumnFormProps {
  formData: any
  errors: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
                setFormData: React.Dispatch<React.SetStateAction<any>>,
                setErrors: React.Dispatch<React.SetStateAction<any>>,
                errors: any) => void
  handleCategoryChange: (value: string, 
                        setFormData: React.Dispatch<React.SetStateAction<any>>) => void
  handleAvailabilityChange: (checked: boolean, 
                            setFormData: React.Dispatch<React.SetStateAction<any>>) => void
  handleSave: () => void
  handleCancel: () => void
  categoriesData: any
  product: any
  isSaving: boolean
  hasChanges: boolean
  setFormData: React.Dispatch<React.SetStateAction<any>>
  setErrors: React.Dispatch<React.SetStateAction<any>>
}

function RightColumnFormComponent({
  formData,
  errors,
  handleChange,
  handleCategoryChange,
  handleAvailabilityChange,
  handleSave,
  handleCancel,
  categoriesData,
  product,
  isSaving,
  hasChanges,
  setFormData,
  setErrors
}: RightColumnFormProps) {
  return (
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
                <Select 
                  value={formData.categoryId.toString()} 
                  onValueChange={(value) => handleCategoryChange(value, setFormData)}
                >
                  <SelectTrigger className={cn("bg-white", errors.categoryId && "border-red-500")}>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.categories?.map((category: any) => (
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
            <Button 
              variant="outline" 
              onClick={handleCancel} 
              className="min-w-[150px]"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving || !hasChanges} 
              className="min-w-[150px]"
            >
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
  )
}

export default RightColumnFormComponent
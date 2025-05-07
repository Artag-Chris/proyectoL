import React from 'react'
import { Package, Search, ShoppingBag, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { SelectableProductCard } from '../SelectedProductsForOrder'


interface ProductType {
  id: string | number
  name: string
  price: number
  quantity: number
  discount?: number
  imageUrl?: string
  category?: string
}

interface UserType {
  id: string | number
  firstName: string
  lastName: string
  email: string
}

interface StepTwoProductsProps {
  selectedUser: UserType | null
  searchProductTerm: string
  selectedProducts: ProductType[]
  filteredProducts: ProductType[]
  loadingProducts: boolean
  calculateOrderTotal: () => number
  onSearchChange: (value: string) => void
  onStepChange: (step: string) => void
  onSelectProduct: (product: ProductType) => void
  onQuantityChange: (productId: string | number, quantity: number) => void
  onResetSearch?: () => void
}

function StepTwoProducts({
  selectedUser,
  searchProductTerm,
  selectedProducts,
  filteredProducts,
  loadingProducts,
  calculateOrderTotal,
  onSearchChange,
  onStepChange,
  onSelectProduct,
  onQuantityChange,
  onResetSearch
}: StepTwoProductsProps) {
  const calculateProductTotal = (product: ProductType) => {
    const price = product.discount 
      ? product.price - (product.price * product.discount) / 100
      : product.price
    return (price * product.quantity).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-primary" />
          Seleccionar Productos
        </h2>

        {/* Resumen del cliente seleccionado */}
        {selectedUser && (
          <div className="bg-muted/30 p-3 rounded-md mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium">Cliente:</span>
              <span>
                {selectedUser.firstName} {selectedUser.lastName}
              </span>
              <span className="text-muted-foreground">({selectedUser.email})</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => onStepChange("user")}>
              Cambiar
            </Button>
          </div>
        )}

        {/* Buscador de productos */}
        <div className="relative max-w-md w-full mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos por nombre o categoría..."
            value={searchProductTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-white/50"
          />
        </div>

        {/* Resumen de productos seleccionados */}
        {selectedProducts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              Productos seleccionados: {selectedProducts.length}
            </h3>
            
            <ScrollArea className="h-24 rounded-md border p-2">
              <div className="space-y-1">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between text-sm p-1 hover:bg-muted/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative rounded overflow-hidden">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span>
                        {product.quantity} x $
                        {(product.discount
                          ? product.price - (product.price * product.discount) / 100
                          : product.price
                        ).toFixed(2)}
                      </span>
                      <Badge variant="outline">
                        ${calculateProductTotal(product)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex justify-end mt-2">
              <Badge className="bg-primary">
                Total: ${calculateOrderTotal().toFixed(2)}
              </Badge>
            </div>
          </div>
        )}

        {/* Listado de productos */}
        {loadingProducts ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-lg font-medium text-[var(--color-text)]">Cargando productos...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const selectedProduct = selectedProducts.find((p) => p.id === product.id)
              return (
                <SelectableProductCard
                  key={product.id}
                  product={product as any}
                  isSelected={!!selectedProduct}
                  quantity={selectedProduct?.quantity || 1}
                  onSelect={() => onSelectProduct(product)}
                  onQuantityChange={(quantity) => onQuantityChange(product.id, quantity as any)}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {searchProductTerm
                ? `No se encontraron productos que coincidan con "${searchProductTerm}"`
                : "No hay productos disponibles"}
            </p>
            {searchProductTerm && onResetSearch && (
              <Button variant="outline" className="mt-4" onClick={onResetSearch}>
                Mostrar todos los productos
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StepTwoProducts
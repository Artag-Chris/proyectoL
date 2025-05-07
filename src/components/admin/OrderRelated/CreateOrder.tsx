"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  PlusCircle,
  Search,
  User,
  ShoppingBag,
  ArrowRight,
  Loader2,
  Package,
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle,
} from "lucide-react"
import { toast } from "sonner"
import PageTransition from "@/components/transitions/PageTransition"
import { SelectableUserCard, type User as UserType } from "./SelectedUserForOrder"
import Image from "next/image"
import useGetUsuarios from "@/hooks/useGetUsuarios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Product } from "../ProductCardAdmin"
import { SelectableProductCard } from "./SelectedProductsForOrder"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import useGetAllProducts from "@/hooks/useGetAllProducts"


// Tipo para productos seleccionados con cantidad
interface SelectedProduct extends Product {
  quantity: number
}

export default function CreateOrderPage() {
  // Estados para el flujo de creación de pedido
  const [currentStep, setCurrentStep] = useState<"user" | "products" | "payment">("user")
  const { data: users, loading, error, refreshData } = useGetUsuarios()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchUserTerm, setSearchUserTerm] = useState("")
  const [searchProductTerm, setSearchProductTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [orderStatus, setOrderStatus] = useState<string>("pending")

  // Hook para obtener productos (simulado para este ejemplo)
  const { data:productos, loading: loadingProducts, error: errorProducts } = useGetAllProducts()

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers =
    users?.usuarios?.filter((user: any) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase()
      const email = user.email.toLowerCase()
      const searchLower = searchUserTerm.toLowerCase()

      return fullName.includes(searchLower) || email.includes(searchLower)
    }) || []

  // Filtrar productos según el término de búsqueda
  const filteredProducts =
    productos?.product?.filter((product: any) => {
      const name = product.name.toLowerCase()
      const category = (product.category || "").toLowerCase()
      const searchLower = searchProductTerm.toLowerCase()

      return name.includes(searchLower) || category.includes(searchLower)
    }) || []

  // Manejar la selección de un usuario
  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user === selectedUser ? null : user)
    if (user !== selectedUser) {
      toast.success(`Cliente seleccionado: ${user.firstName} ${user.lastName}`)
    }
  }

  // Continuar al siguiente paso (selección de productos)
  const handleContinueToProducts = () => {
    if (selectedUser) {
      setCurrentStep("products")
      toast.info("Selecciona los productos para el pedido")
    }
  }

  // Manejar la selección de un producto
  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = selectedProducts.some((p) => p.id === product.id)

    if (isAlreadySelected) {
      // Si ya está seleccionado, lo quitamos
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
    } else {
      // Si no está seleccionado, lo añadimos con cantidad 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  // Manejar cambio de cantidad de un producto
  const handleQuantityChange = (product: Product, quantity: number) => {
    setSelectedProducts(selectedProducts.map((p) => (p.id === product.id ? { ...p, quantity } : p)))
  }

  // Calcular el total del pedido
  const calculateOrderTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const price = product.discount ? product.price - (product.price * product.discount) / 100 : product.price
      return total + price * product.quantity
    }, 0)
  }

  // Continuar al paso de pago
  const handleContinueToPayment = () => {
    if (selectedProducts.length > 0) {
      setCurrentStep("payment")
      toast.info("Configura el método de pago y estado del pedido")
    } else {
      toast.error("Debes seleccionar al menos un producto")
    }
  }

  // Volver al paso anterior
  const handleBack = () => {
    if (currentStep === "products") {
      setCurrentStep("user")
    } else if (currentStep === "payment") {
      setCurrentStep("products")
    }
  }

  // Crear el pedido
  const handleCreateOrder = async () => {
    if (!selectedUser || selectedProducts.length === 0 || !paymentMethod || !orderStatus) {
      toast.error("Por favor completa todos los campos requeridos")
      return
    }

    // Aquí iría la lógica para enviar el pedido al backend
    try {
      // Simulación de envío
      toast.loading("Creando pedido...")

      // Formato del pedido para enviar al backend
      const orderData = {
        userId: selectedUser.id,
        products: selectedProducts.map((p) => ({
          productId: p.id,
          quantity: p.quantity,
          price: p.discount ? p.price - (p.price * p.discount) / 100 : p.price,
        })),
        total: calculateOrderTotal(),
        paymentMethod,
        status: orderStatus,
      }

      // Simulación de respuesta exitosa
      setTimeout(() => {
        toast.dismiss()
        toast.success("¡Pedido creado correctamente!")
        console.log("Datos del pedido:", orderData)

        // Resetear el formulario
        setSelectedUser(null)
        setSelectedProducts([])
        setPaymentMethod("")
        setOrderStatus("pending")
        setCurrentStep("user")
      }, 1500)
    } catch (error) {
      toast.error("Error al crear el pedido")
      console.error(error)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />

      <div className="max-w-7xl mx-auto">
        <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <PlusCircle className="h-6 w-6 text-primary" />
                Crear Nuevo Pedido
              </CardTitle>

              {/* Indicador de pasos */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={currentStep === "user" ? "default" : "outline"}
                  className={currentStep === "user" ? "bg-primary" : ""}
                >
                  1. Cliente
                </Badge>
                <div className="h-px w-4 bg-muted"></div>
                <Badge
                  variant={currentStep === "products" ? "default" : "outline"}
                  className={currentStep === "products" ? "bg-primary" : ""}
                >
                  2. Productos
                </Badge>
                <div className="h-px w-4 bg-muted"></div>
                <Badge
                  variant={currentStep === "payment" ? "default" : "outline"}
                  className={currentStep === "payment" ? "bg-primary" : ""}
                >
                  3. Pago
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Paso 1: Selección de cliente */}
            {currentStep === "user" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    Seleccionar Cliente
                  </h2>

                  {/* Buscador de usuarios */}
                  <div className="relative max-w-md w-full mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre o email..."
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                      className="pl-9 bg-white/50"
                    />
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-lg font-medium text-[var(--color-text)]">Cargando clientes...</p>
                      </div>
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUsers.map((user: any) => (
                        <SelectableUserCard
                          key={user.id}
                          user={user as UserType}
                          isSelected={selectedUser?.id === user.id}
                          onSelect={() => handleSelectUser(user as UserType)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">
                        {searchUserTerm
                          ? `No se encontraron clientes que coincidan con "${searchUserTerm}"`
                          : "No hay clientes disponibles"}
                      </p>
                      {searchUserTerm && (
                        <Button variant="outline" className="mt-4" onClick={() => setSearchUserTerm("")}>
                          Mostrar todos los clientes
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Paso 2: Selección de productos */}
            {currentStep === "products" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    Seleccionar Productos
                  </h2>

                  {/* Cliente seleccionado (resumen) */}
                  <div className="bg-muted/30 p-3 rounded-md mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-medium">Cliente:</span>
                      <span>
                        {selectedUser?.firstName} {selectedUser?.lastName}
                      </span>
                      <span className="text-muted-foreground">({selectedUser?.email})</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setCurrentStep("user")}>
                      Cambiar
                    </Button>
                  </div>

                  {/* Buscador de productos */}
                  <div className="relative max-w-md w-full mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos por nombre o categoría..."
                      value={searchProductTerm}
                      onChange={(e) => setSearchProductTerm(e.target.value)}
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
                                  $
                                  {(
                                    (product.discount
                                      ? product.price - (product.price * product.discount) / 100
                                      : product.price) * product.quantity
                                  ).toFixed(2)}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="flex justify-end mt-2">
                        <Badge className="bg-primary">Total: ${calculateOrderTotal().toFixed(2)}</Badge>
                      </div>
                    </div>
                  )}

                  {loadingProducts ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-lg font-medium text-[var(--color-text)]">Cargando productos...</p>
                      </div>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product: any) => {
                        const selectedProduct = selectedProducts.find((p) => p.id === product.id)
                        return (
                          <SelectableProductCard
                            key={product.id}
                            product={product}
                            isSelected={!!selectedProduct}
                            quantity={selectedProduct?.quantity || 1}
                            onSelect={handleSelectProduct}
                            onQuantityChange={handleQuantityChange}
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
                      {searchProductTerm && (
                        <Button variant="outline" className="mt-4" onClick={() => setSearchProductTerm("")}>
                          Mostrar todos los productos
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Paso 3: Método de pago y estado del pedido */}
            {currentStep === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Finalizar Pedido
                  </h2>

                  {/* Resumen del pedido */}
                  <div className="bg-muted/30 p-4 rounded-md mb-6">
                    <h3 className="font-medium mb-3">Resumen del pedido</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">Cliente:</span>
                        <span>
                          {selectedUser?.firstName} {selectedUser?.lastName}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <ShoppingBag className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <span className="font-medium">Productos:</span>
                          <ul className="mt-1 space-y-1 text-sm">
                            {selectedProducts.map((product) => (
                              <li key={product.id} className="flex justify-between">
                                <span>
                                  {product.name} x {product.quantity}
                                </span>
                                <span>
                                  $
                                  {(
                                    (product.discount
                                      ? product.price - (product.price * product.discount) / 100
                                      : product.price) * product.quantity
                                  ).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${calculateOrderTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Método de pago */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        Método de pago
                      </label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Selecciona un método de pago" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Tarjeta de crédito</SelectItem>
                          <SelectItem value="debit_card">Tarjeta de débito</SelectItem>
                          <SelectItem value="cash">Efectivo</SelectItem>
                          <SelectItem value="transfer">Transferencia bancaria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Estado del pedido */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        Estado del pedido
                      </label>
                      <Select value={orderStatus} onValueChange={setOrderStatus}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="processing">En proceso</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-between py-4">
            {currentStep !== "user" ? (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Atrás
              </Button>
            ) : (
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancelar
              </Button>
            )}

            {currentStep === "user" && (
              <Button onClick={handleContinueToProducts} disabled={!selectedUser} className="gap-2">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {currentStep === "products" && (
              <Button onClick={handleContinueToPayment} disabled={selectedProducts.length === 0} className="gap-2">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {currentStep === "payment" && (
              <Button onClick={handleCreateOrder} disabled={!paymentMethod || !orderStatus} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Crear Pedido
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


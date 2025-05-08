"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import PageTransition from "@/components/transitions/PageTransition"
import { type User as UserType } from "./SelectedUserForOrder"
import useGetUsuarios from "@/hooks/useGetUsuarios"
import { Badge } from "@/components/ui/badge"
import { Product } from "../ProductCardAdmin"
import useGetAllProducts from "@/hooks/useGetAllProducts"
import StepOneUser from "./steps/StepOneUser"
import StepTwoProducts from "./steps/StepTwoProducts"
import StepThreePaymentMethod from "./steps/StepThreePaymentMethod"
import { sendOrder } from "@/utils/functions/handleCreateOrder"


// Tipo para productos seleccionados con cantidad
interface SelectedProduct extends Product {
  quantity: number
}

export default function CreateOrderPage() {
  // Estados para el flujo de creación de pedido
  const [currentStep, setCurrentStep] = useState<"user" | "products" | "payment">("user")
  const { data: users, loading } = useGetUsuarios()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchUserTerm, setSearchUserTerm] = useState("")
  const [searchProductTerm, setSearchProductTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [orderStatus, setOrderStatus] = useState<string>("pending")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Hook para obtener productos (simulado para este ejemplo)
  const { data: productos, loading: loadingProducts, error: errorProducts } = useGetAllProducts()

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
  const handleCreateOrder = async () => {
    setIsSubmitting(true)
    try {
      await sendOrder({
        selectedUser,
        selectedProducts,
        paymentMethod,
        orderStatus,
        calculateOrderTotal,
        resetForm: () => {
          setSelectedUser(null)
          setSelectedProducts([])
          setPaymentMethod("")
          setOrderStatus("pending")
          setCurrentStep("user")
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar la selección de un producto
  const handleSelectProduct = (product: any) => {
    setSelectedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        // Solo remueve el producto si explícitamente se deselecciona
        return prev.filter(p => p.id !== product.id);
      } else {
        // Añade el producto con cantidad inicial 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
  const handleQuantityChange = (product: Product, quantity: number) => {
    setSelectedProducts(prev => {
      const existingProductIndex = prev.findIndex(p => p.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Si el producto existe, actualiza su cantidad
        const newProducts = [...prev];
        newProducts[existingProductIndex] = { ...prev[existingProductIndex], quantity };
        return newProducts;
      }
      
      // Si el producto no existe, añádelo con la cantidad especificada
      return [...prev, { ...product, quantity }];
    });
  };

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
              <StepOneUser
              searchUserTerm={searchUserTerm}
              loading={loading}
              filteredUsers={filteredUsers}
              selectedUser={selectedUser}
              onSearchChange={setSearchUserTerm}
              onSelectUser={handleSelectUser}
              onResetSearch={() => setSearchUserTerm('')}
            />
            )}

            {/* Paso 2: Selección de productos */}
            {currentStep === "products" && (
            <StepTwoProducts
            selectedUser={selectedUser as any}
            searchProductTerm={searchProductTerm}
            selectedProducts={selectedProducts}
            filteredProducts={filteredProducts as any}
            loadingProducts={loadingProducts}
            calculateOrderTotal={calculateOrderTotal}
            onSearchChange={setSearchProductTerm}
            onStepChange={setCurrentStep as any}
            onSelectProduct={handleSelectProduct as any}
            onQuantityChange={handleQuantityChange as any}
            onResetSearch={() => setSearchProductTerm('')}
          />
            )}

            {/* Paso 3: Método de pago y estado del pedido */}
            {currentStep === "payment" && (
              <StepThreePaymentMethod
              selectedUser={selectedUser}
              selectedProducts={selectedProducts}
              paymentMethod={paymentMethod}
              orderStatus={orderStatus}
              calculateOrderTotal={calculateOrderTotal}
              setPaymentMethod={setPaymentMethod}
              setOrderStatus={setOrderStatus}
            />
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
              <Button 
              onClick={handleCreateOrder} 
              disabled={!paymentMethod || !orderStatus || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creando pedido...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Confirmar Pedido
                </>
              )}
            </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


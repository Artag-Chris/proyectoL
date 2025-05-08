"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { TabsContent } from "@radix-ui/react-tabs"
import {
  Edit,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  User,
  Calendar,
  CreditCard,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { GetAllOrdersResponse } from "@/utils/interfaces/ordersRelatedInterfaces"
import axios from "axios"
import { cn } from "@/lib/utils"
import useGetAllOrdersToModify from "@/hooks/useGetAllOrdersToModify"

function ModifyOrder() {
  const { data, loading, error } = useGetAllOrdersToModify()
  const [searchId, setSearchId] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<GetAllOrdersResponse | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Helper function to map orderStatusId to status text and badge variant
  const getOrderStatus = (statusId: number) => {
    switch (statusId) {
      case 1:
        return {
          text: "Pendiente",
          variant: "outline" as const,
          icon: <Clock className="h-4 w-4 text-amber-500" />,
          color: "text-amber-500",
          bgColor: "bg-amber-100",
        }
      case 2:
        return {
          text: "Entregado",
          variant: "default" as const,
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
          color: "text-green-500",
          bgColor: "bg-green-100",
        }
      case 3:
        return {
          text: "Cancelado",
          variant: "destructive" as const,
          icon: <XCircle className="h-4 w-4" />,
          color: "text-red-500",
          bgColor: "bg-red-100",
        }
      default:
        return {
          text: "Desconocido",
          variant: "outline" as const,
          icon: <Clock className="h-4 w-4" />,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
        }
    }
  }

  const handleSearch = () => {
    if (!searchId.trim()) {
      toast.error("Por favor, ingresa un ID de pedido");
      return;
    }

    if (!data?.orders) {
      toast.error("No hay datos disponibles");
      return;
    }

    const foundOrder = data.orders.find(
      (order) => order.id.toString() === searchId.trim()
    );

    if (foundOrder) {
      setSelectedOrder(foundOrder);
      toast.success(`Pedido #${foundOrder.id} encontrado`);
    } else {
      setSelectedOrder(null);
      toast.error(`No se encontró ningún pedido con ID ${searchId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  const handleUpdateStatus = async (newStatusId: number) => {
    if (!selectedOrder) return

    setIsUpdating(true)

    try {
      // Make API call to update order status
      const response = await axios.put(`http://localhost:45623/api/pedidos/${selectedOrder.id}/status`, {
        orderStatusId: newStatusId,
      })

      if (response.status === 200) {
        // Update the local state with the new status
        setSelectedOrder({
          ...selectedOrder,
          orderStatusId: newStatusId,
        })

        const statusText = getOrderStatus(newStatusId).text
        toast.success(`Estado del pedido actualizado a "${statusText}"`)
      } else {
        throw new Error("Error al actualizar el estado del pedido")
      }
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("No se pudo actualizar el estado del pedido")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <TabsContent value="modify-order" className="mt-0">
      <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Modificar Pedido Existente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Buscador existente */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* ...existing search input code... */}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Mostrar lista de órdenes si no hay una seleccionada */}
            {!selectedOrder && data?.orders && data.orders.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.orders.map((order) => (
                  <Card 
                    key={order.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Pedido #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(order.createdAt), "d MMM yyyy, HH:mm", { locale: es })}
                          </p>
                        </div>
                        <Badge variant={getOrderStatus(order.orderStatusId).variant}>
                          {getOrderStatus(order.orderStatusId).text}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <p>Total: ${order.totalAmount.toFixed(2)}</p>
                        <p>Items: {order.orderItems.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Mostrar detalles si hay una orden seleccionada */}
            {selectedOrder ? (
              <>
                <Button 
                  variant="ghost" 
                  className="mb-4"
                  onClick={() => setSelectedOrder(null)}
                >
                  ← Volver a la lista
                </Button>
                <OrderDetails 
                  order={selectedOrder} 
                  onUpdateStatus={handleUpdateStatus} 
                  isUpdating={isUpdating} 
                />
              </>
            ) : null}

            {/* Mostrar mensaje si no hay órdenes */}
            {!loading && (!data?.orders || data.orders.length === 0) && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No hay pedidos disponibles</h3>
                <p className="text-gray-500 mt-2">
                  No se encontraron pedidos en el sistema.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

interface OrderDetailsProps {
  order: GetAllOrdersResponse
  onUpdateStatus: (newStatusId: number) => void
  isUpdating: boolean
}

function OrderDetails({ order, onUpdateStatus, isUpdating }: OrderDetailsProps) {
  const status = getOrderStatus(order.orderStatusId)
  const orderDate = new Date(order.createdAt)

  // Format date
  const formattedDate = format(orderDate, "d 'de' MMMM, yyyy", { locale: es })
  const formattedTime = format(orderDate, "HH:mm", { locale: es })

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--color-text)]/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("flex items-center justify-center w-10 h-10 rounded-full", status.bgColor, status.color)}>
            {status.icon}
          </div>
          <div>
            <h3 className="font-medium text-[var(--color-text)]">Pedido #{order.id}</h3>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text)]/60">
              <Calendar className="h-3 w-3" />
              <span>
                {formattedDate} a las {formattedTime}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={status.variant} className="ml-auto">
          {status.text}
        </Badge>
      </div>

      {/* Order details */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Información del Cliente
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text)]/60">ID de Cliente:</span>
              <span className="font-medium">{order.userId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text)]/60">Total del Pedido:</span>
              <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            Productos ({order.orderItems.length})
          </h4>
          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-[var(--color-text)]/10 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    {item.quantity}
                  </div>
                  <span>Producto #{item.productId}</span>
                </div>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      {order.transactions && order.transactions.length > 0 && (
        <>
          <Separator />
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Transacciones ({order.transactions.length})
            </h4>
            <div className="space-y-2">
              {order.transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{transaction.paymentMethod}</span>
                    <div className="text-xs text-[var(--color-text)]/60">
                      {format(new Date(transaction.transactionDate), "d MMM yyyy, HH:mm", { locale: es })}
                    </div>
                  </div>
                  <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <Separator />
      <div className="p-4 bg-[var(--color-text)]/5">
        <div className="flex flex-col space-y-3">
          <h4 className="text-sm font-medium">Cambiar Estado del Pedido</h4>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={order.orderStatusId === 1 || isUpdating}
              onClick={() => onUpdateStatus(1)}
            >
              <Clock className="h-4 w-4 text-amber-500" />
              Pendiente
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700"
              disabled={order.orderStatusId === 2 || isUpdating}
              onClick={() => onUpdateStatus(2)}
            >
              <CheckCircle2 className="h-4 w-4" />
              Entregado
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              disabled={order.orderStatusId === 3 || isUpdating}
              onClick={() => onUpdateStatus(3)}
            >
              <XCircle className="h-4 w-4" />
              Cancelado
            </Button>

            {isUpdating && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-text)]/60">
                <Loader2 className="h-4 w-4 animate-spin" />
                Actualizando estado...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to map orderStatusId to status text and badge variant
function getOrderStatus(statusId: number) {
  switch (statusId) {
    case 1:
      return {
        text: "Pendiente",
        variant: "outline" as const,
        icon: <Clock className="h-4 w-4 text-amber-500" />,
        color: "text-amber-500",
        bgColor: "bg-amber-100",
      }
    case 2:
      return {
        text: "Entregado",
        variant: "default" as const,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
      }
    case 3:
      return {
        text: "Cancelado",
        variant: "destructive" as const,
        icon: <XCircle className="h-4 w-4" />,
        color: "text-red-500",
        bgColor: "bg-red-100",
      }
    default:
      return {
        text: "Desconocido",
        variant: "outline" as const,
        icon: <Clock className="h-4 w-4" />,
        color: "text-gray-500",
        bgColor: "bg-gray-100",
      }
  }
}

export default ModifyOrder

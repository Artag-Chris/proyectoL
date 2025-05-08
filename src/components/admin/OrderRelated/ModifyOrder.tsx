"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TabsContent } from "@radix-ui/react-tabs"
import {
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { GetAllOrdersResponse } from "@/utils/interfaces/ordersRelatedInterfaces"
import axios from "axios"
import useGetAllOrdersToModify from "@/hooks/useGetAllOrdersToModify"
import OrderDetails from "./modifyOrderComponents/OrderDetails"

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

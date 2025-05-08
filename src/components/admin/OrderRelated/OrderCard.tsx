"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp, Package, CreditCard, Calendar, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { GetAllOrdersResponse } from "@/utils/interfaces/ordersRelatedInterfaces"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface OrderCardProps {
  order: GetAllOrdersResponse
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Helper function to map orderStatusId to status text and badge variant
  const getOrderStatus = (statusId: number) => {
    switch (statusId) {
      case 1:
        return {
          text: "Pendiente",
          variant: "outline" as const,
          icon: <Clock className="h-4 w-4 text-amber-500" />,
        }
      case 2:
        return {
          text: "Entregado",
          variant: "default" as const,
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        }
      case 3:
        return {
          text: "Cancelado",
          variant: "destructive" as const,
          icon: <XCircle className="h-4 w-4" />,
        }
      default:
        return {
          text: "Desconocido",
          variant: "outline" as const,
          icon: <Clock className="h-4 w-4" />,
        }
    }
  }

  const status = getOrderStatus(order.orderStatusId)
  const orderDate = new Date(order.createdAt)

  // Format date
  const formattedDate = format(orderDate, "d 'de' MMMM, yyyy", { locale: es })
  const formattedTime = format(orderDate, "HH:mm", { locale: es })

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        "backdrop-blur-md bg-white/10 border-none",
        isExpanded ? "shadow-lg" : "shadow",
      )}
    >
      {/* Cabecera */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              order.orderStatusId === 1
                ? "bg-amber-100 text-amber-600"
                : order.orderStatusId === 2
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600",
            )}
          >
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
        <Badge variant={status.variant} className="ml-auto mr-2">
          {status.text}
        </Badge>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Información básica */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-[var(--color-text)]/60">Total</span>
          <span className="font-semibold text-[var(--color-text)]">${order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[var(--color-text)]/60">Cliente ID</span>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-[var(--color-text)]/60" />
            <span className="text-[var(--color-text)]">{order.userId}</span>
          </div>
        </div>
      </div>

      {/* Detalles expandibles */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Separator />

        {/* Productos */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Productos ({order.orderItems.length})
          </h4>
          <div className="space-y-2">
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

        {/* Transacciones */}
        {order.transactions && order.transactions.length > 0 && (
          <>
            <Separator />
            <div className="p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
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

        {/* Acciones */}
        <div className="p-4 bg-[var(--color-text)]/5">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Ver detalles
            </Button>
            {order.orderStatusId === 1 && (
              <Button variant="default" size="sm">
                Marcar como entregado
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

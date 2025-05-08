import React from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { 
  User, 
  Package, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Loader2, 
  Calendar
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface OrderItem {
  id: string | number
  productId: string | number
  quantity: number
  price: number
}

interface Transaction {
  id: string | number
  paymentMethod: string
  amount: number
  transactionDate: string | Date
}

interface Order {
  id: string | number
  userId: string | number
  totalAmount: number
  orderStatusId: number
  createdAt: string | Date
  orderItems: OrderItem[]
  transactions?: Transaction[]
}

interface OrderDetailsProps {
  order: Order
  onUpdateStatus: (statusId: number) => void
  isUpdating: boolean
}

const getOrderStatus = (statusId: number) => {
  const statusMap = {
    1: {
      text: 'Pendiente',
      variant: 'outline' as const,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    2: {
      text: 'En proceso',
      variant: 'default' as const,
      icon: <Loader2 className="h-5 w-5 animate-spin" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    3: {
      text: 'Enviado',
      variant: 'default' as const,
      icon: <Package className="h-5 w-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    4: {
      text: 'Entregado',
      variant: 'default' as const,
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: 'text-green-700',
      bgColor: 'bg-green-700/10'
    },
    5: {
      text: 'Cancelado',
      variant: 'destructive' as const,
      icon: <XCircle className="h-5 w-5" />,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  }

  return statusMap[statusId as keyof typeof statusMap] || statusMap[1]
}

function OrderDetails({ order, onUpdateStatus, isUpdating }: OrderDetailsProps) {
  const status = getOrderStatus(order.orderStatusId)
  const orderDate = new Date(order.createdAt)

  // Formatear fechas
  const formattedDate = format(orderDate, "d 'de' MMMM, yyyy", { locale: es })
  const formattedTime = format(orderDate, "HH:mm", { locale: es })

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Encabezado */}
      <div className="bg-[var(--color-text)]/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            status.bgColor,
            status.color
          )}>
            {status.icon}
          </div>
          <div>
            <h3 className="font-medium text-[var(--color-text)]">Pedido #{order.id}</h3>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text)]/60">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate} a las {formattedTime}</span>
            </div>
          </div>
        </div>
        <Badge variant={status.variant} className="ml-auto">
          {status.text}
        </Badge>
      </div>

      {/* Detalles principales */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de cliente */}
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

        {/* Sección de productos */}
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

      {/* Transacciones */}
      {order.transactions!.length > 0 && (
        <>
          <Separator />
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Transacciones ({order.transactions!.length})
            </h4>
            <div className="space-y-2">
              {order.transactions!.map((transaction) => (
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
              disabled={order.orderStatusId === 4 || isUpdating}
              onClick={() => onUpdateStatus(4)}
            >
              <CheckCircle2 className="h-4 w-4" />
              Entregado
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              disabled={order.orderStatusId === 5 || isUpdating}
              onClick={() => onUpdateStatus(5)}
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

export default OrderDetails
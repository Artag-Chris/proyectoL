"use client"

import type React from "react"

import { FadeInTransition } from "@/components/transitions/FadeIn"
import { TabsContent, Tabs } from "@radix-ui/react-tabs"
import { Search, Filter, ArrowUpDown, Clock, CheckCircle2, XCircle } from "lucide-react"
import { OrderCard } from "./OrderCard"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import useGetAllOrders from "@/hooks/useGetAllOrders"
import type { GetAllOrdersResponse } from "@/utils/interfaces/ordersRelatedInterfaces"

interface ViewOrdersTabProps {
  searchTerm: string
  statusFilter: string
  sortOrder: string
  setSearchTerm: (value: string) => void
  setStatusFilter: (value: string) => void
  setSortOrder: (value: string) => void
}

export default function ViewOrdersTabs({
  searchTerm,
  statusFilter,
  sortOrder,
  setSearchTerm,
  setStatusFilter,
  setSortOrder,
}: ViewOrdersTabProps) {
  const { data, loading, error } = useGetAllOrders()

  // Helper function to map orderStatusId to status text
  const getOrderStatusText = (statusId: number): string => {
    switch (statusId) {
      case 1:
        return "Pendiente"
      case 2:
        return "Entregado"
      case 3:
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  if (loading)
    return (
      <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg font-medium">Cargando pedidos...</p>
        </div>
      </Card>
    )

  if (error)
    return (
      <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl p-8">
        <CardHeader>
          <CardTitle className="text-red-500">Error al cargar los pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )

  const filteredOrders =
    data?.orders?.filter((order: GetAllOrdersResponse) => {
      // Map orderStatusId to status strings
      const orderStatus = getOrderStatusText(order.orderStatusId)

      const matchesStatus = statusFilter === "all" || orderStatus === statusFilter

      // Search in order ID and items (if they exist)
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        (order.orderItems && order.orderItems.some((item) => item.productId.toString().includes(searchTerm)))

      return matchesStatus && matchesSearch
    }) || []

  // Sort orders based on sort order
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortOrder === "highest") {
      return b.totalAmount - a.totalAmount
    } else {
      return a.totalAmount - b.totalAmount
    }
  })

  // Group orders by status for the view tab
  const pendingOrders = sortedOrders.filter((order) => order.orderStatusId === 1)
  const deliveredOrders = sortedOrders.filter((order) => order.orderStatusId === 2)
  const canceledOrders = sortedOrders.filter((order) => order.orderStatusId === 3)

  return (
    <TabsContent value="view-orders" className="space-y-8 mt-0">
      <Tabs>
        {/* Filtros */}
        <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID o producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filtro por estado */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Entregado">Entregado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              {/* Ordenamiento */}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="oldest">Más antiguos</SelectItem>
                  <SelectItem value="highest">Mayor importe</SelectItem>
                  <SelectItem value="lowest">Menor importe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Listado de pedidos */}
        {statusFilter !== "all" ? (
          <div>
            <HeaderSection status={statusFilter} count={sortedOrders.length} />
            <OrderList orders={sortedOrders} status={statusFilter} />
          </div>
        ) : (
          <>
            {pendingOrders.length > 0 && (
              <>
                <OrderList
                  title="Pedidos Pendientes"
                  orders={pendingOrders}
                  icon={<Clock className="h-5 w-5 text-amber-500" />}
                  status="Pendiente"
                />
                <Separator className="my-8" />
              </>
            )}

            {deliveredOrders.length > 0 && (
              <>
                <OrderList
                  title="Pedidos Entregados"
                  orders={deliveredOrders}
                  icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
                  status="Entregado"
                />
                <Separator className="my-8" />
              </>
            )}

            {canceledOrders.length > 0 && (
              <OrderList
                title="Pedidos Cancelados"
                orders={canceledOrders}
                icon={<XCircle className="h-5 w-5 text-red-500" />}
                status="Cancelado"
              />
            )}

            {pendingOrders.length === 0 && deliveredOrders.length === 0 && canceledOrders.length === 0 && (
              <EmptyState status="all" />
            )}
          </>
        )}
      </Tabs>
    </TabsContent>
  )
}

// Componentes internos
const HeaderSection = ({ status, count }: { status: string; count: number }) => (
  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
    {status === "Pendiente" ? (
      <Clock className="h-5 w-5 text-amber-500" />
    ) : status === "Entregado" ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : status === "Cancelado" ? (
      <XCircle className="h-5 w-5 text-red-500" />
    ) : (
      <Filter className="h-5 w-5" />
    )}
    Pedidos {status}
    <Badge variant="outline" className="ml-2">
      {count}
    </Badge>
  </h2>
)

const OrderList = ({
  title,
  orders,
  icon,
  status,
}: {
  title?: string
  orders: GetAllOrdersResponse[]
  icon?: React.ReactNode
  status: string
}) => (
  <div>
    {title && (
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
        {icon}
        {title}
        <Badge variant="outline" className="ml-2">
          {orders.length}
        </Badge>
      </h2>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {orders.length > 0 ? (
        orders.map((order) => (
          <FadeInTransition key={order.id} position="right">
            <OrderCard order={order} />
          </FadeInTransition>
        ))
      ) : (
        <EmptyState status={status} />
      )}
    </div>
  </div>
)

const EmptyState = ({ status }: { status: string }) => (
  <Card className="col-span-full backdrop-blur-md bg-white/10 border-none p-8 text-center">
    <p className="text-[var(--color-text)]/70">
      {status === "all" ? "No hay pedidos" : `No hay pedidos ${status.toLowerCase()}`}
    </p>
  </Card>
)

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import { orders } from "../dummy/adminDummy"
import {
  ShoppingBag,
  PlusCircle,
  Edit,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
} from "lucide-react"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("view-orders")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesStatus && matchesSearch
  })

  // Sort orders based on sort order
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id // Assuming higher ID means newer
    } else if (sortOrder === "oldest") {
      return a.id - b.id
    } else if (sortOrder === "highest") {
      return b.total - a.total
    } else {
      return a.total - b.total
    }
  })

  // Group orders by status for the view tab
  const pendingOrders = sortedOrders.filter((order) => order.status === "Pendiente")
  const deliveredOrders = sortedOrders.filter((order) => order.status === "Entregado")

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-[var(--color-text)]">Gestión de Pedidos</h1>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
            {orders.length}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="view-orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Ver Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="create-order" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Crear Pedido</span>
            </TabsTrigger>
            <TabsTrigger value="modify-order" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span>Modificar Pedido</span>
            </TabsTrigger>
            <TabsTrigger value="shopping-carts" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Carritos</span>
            </TabsTrigger>
          </TabsList>

          {/* View Orders Tab */}
          <TabsContent value="view-orders" className="space-y-8 mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Filtros y Búsqueda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por ID, cliente o producto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

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

            {statusFilter !== "all" ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
                  {statusFilter === "Pendiente" ? (
                    <Clock className="h-5 w-5 text-amber-500" />
                  ) : statusFilter === "Entregado" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Filter className="h-5 w-5" />
                  )}
                  Pedidos {statusFilter}
                  <Badge variant="outline" className="ml-2">
                    {sortedOrders.length}
                  </Badge>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <FadeInTransition key={order.id} position="right">
                        <OrderCard order={order} />
                      </FadeInTransition>
                    ))
                  ) : (
                    <Card className="col-span-full backdrop-blur-md bg-white/10 border-none p-8 text-center">
                      <p className="text-[var(--color-text)]/70">No hay pedidos con el estado {statusFilter}</p>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Pedidos Pendientes
                    <Badge variant="outline" className="ml-2">
                      {pendingOrders.length}
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingOrders.length > 0 ? (
                      pendingOrders.map((order) => (
                        <FadeInTransition key={order.id} position="right">
                          <OrderCard order={order} />
                        </FadeInTransition>
                      ))
                    ) : (
                      <Card className="col-span-full backdrop-blur-md bg-white/10 border-none p-8 text-center">
                        <p className="text-[var(--color-text)]/70">No hay pedidos pendientes</p>
                      </Card>
                    )}
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Últimos Pedidos Entregados
                    <Badge variant="outline" className="ml-2">
                      {deliveredOrders.length}
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {deliveredOrders.length > 0 ? (
                      deliveredOrders.map((order) => (
                        <FadeInTransition key={order.id} position="right">
                          <OrderCard order={order} />
                        </FadeInTransition>
                      ))
                    ) : (
                      <Card className="col-span-full backdrop-blur-md bg-white/10 border-none p-8 text-center">
                        <p className="text-[var(--color-text)]/70">No hay pedidos entregados</p>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Create Order Tab */}
          <TabsContent value="create-order" className="mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Crear Nuevo Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Funcionalidad en desarrollo</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Esta sección para crear nuevos pedidos estará disponible próximamente. Aquí podrás seleccionar
                    productos, asignar clientes y generar nuevos pedidos.
                  </p>
                  <Button variant="outline" disabled>
                    Próximamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modify Order Tab */}
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
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Buscar Pedido por ID</label>
                      <div className="flex gap-2">
                        <Input placeholder="Ej: 1001" className="flex-1" />
                        <Button variant="secondary">Buscar</Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Filtrar por Cliente</label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Cliente 1</SelectItem>
                          <SelectItem value="2">Cliente 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Edit className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Selecciona un pedido para modificar</h3>
                    <p className="text-muted-foreground max-w-md">
                      Busca un pedido por su ID o filtra por cliente para comenzar a editar sus detalles, cambiar su
                      estado o actualizar los productos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shopping Carts Tab */}
          <TabsContent value="shopping-carts" className="mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Carritos de Compra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Monitoreo de Carritos</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Esta sección mostrará información sobre los carritos de compra activos de tus clientes,
                    permitiéndote analizar comportamientos de compra y productos abandonados.
                  </p>
                  <Button variant="outline" disabled>
                    Próximamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OrderCard({ order }:any) {
  // Format date - in a real app, you would use the actual date from the database
  const orderDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="backdrop-blur-md bg-white/10 border-none overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg text-[var(--color-text)] flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-primary" />
          Pedido #{order.id}
        </CardTitle>
        <Badge
          variant={
            order.status === "Pendiente" ? "default" : order.status === "Entregado" ? "secondary" : "destructive"
          }
          className={order.status === "Pendiente" ? "bg-amber-500" : order.status === "Entregado" ? "bg-green-500" : ""}
        >
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[var(--color-text)] font-semibold">Cliente: {order.user}</p>
          <div className="flex items-center text-xs text-[var(--color-text)]/70">
            <Calendar className="h-3 w-3 mr-1" />
            {orderDate}
          </div>
        </div>

        <div className="bg-black/5 rounded-md p-2 mb-3">
          <p className="text-xs text-[var(--color-text)]/70 mb-1">Productos:</p>
          <ul className="space-y-1">
            {order.items.map((item:any, index:any) => (
              <li key={index} className="text-[var(--color-text)]/80 text-sm flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[var(--color-text)] font-semibold">Total: ${order.total.toFixed(2)}</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="outline" size="sm" className="h-8">
              <Edit className="h-3 w-3 mr-1" />
              Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

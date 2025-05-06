"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTransition from "@/components/transitions/PageTransition"
import { orders } from "../dummy/adminDummy"
import {
  ShoppingBag,
  PlusCircle,
  Edit,
  ShoppingCart,
} from "lucide-react"
import { ViewOrdersTab } from "@/components/admin/OrderRelated/ViewOrdersTabs"
import CreateOrder from "@/components/admin/OrderRelated/CreateOrder"
import ModifyOrder from "@/components/admin/OrderRelated/ModifyOrder"
import ShoppingCartsView from "@/components/admin/OrderRelated/ShoppingCartsView"

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
          <ViewOrdersTab
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            sortOrder={sortOrder}
            sortedOrders={sortedOrders}
            pendingOrders={pendingOrders}
            deliveredOrders={deliveredOrders}
            orders={orders}
            setSearchTerm={setSearchTerm}
            setStatusFilter={setStatusFilter}
            setSortOrder={setSortOrder}
          />

          {/* Create Order Tab */}
          <CreateOrder />

          {/* Modify Order Tab */}
          <ModifyOrder />

          {/* Shopping Carts Tab */}
          <ShoppingCartsView />
        </Tabs>
      </div>
    </div>
  )
}


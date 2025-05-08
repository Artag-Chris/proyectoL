"use client"

import { useState, Suspense, lazy } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTransition from "@/components/transitions/PageTransition"
import { orders } from "../dummy/adminDummy"
import { ShoppingBag, PlusCircle, Edit, ShoppingCart } from "lucide-react"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import LoadingSkeleton from "@/components/admin/OrderRelated/LoadingSkeleton"


// Carga diferida de componentes
const ViewOrdersTab = lazy(() => import("@/components/admin/OrderRelated/ViewOrdersTabs"))
const CreateOrder = lazy(() => import("@/components/admin/OrderRelated/CreateOrder"))
const ModifyOrder = lazy(() => import("@/components/admin/OrderRelated/ModifyOrder"))
const ShoppingCartsView = lazy(() => import("@/components/admin/OrderRelated/ShoppingCartsView"))

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("view-orders")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  const renderTabContent = () => {
    switch (activeTab) {
      case "view-orders":
        return (
          <Suspense fallback={<LoadingSkeleton />}>
            <ViewOrdersTab
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              sortOrder={sortOrder}
            
              setSearchTerm={setSearchTerm}
              setStatusFilter={setStatusFilter}
              setSortOrder={setSortOrder}
            />
          </Suspense>
        )
      case "create-order":
        return (
          <Suspense fallback={<LoadingSkeleton />}>
            <CreateOrder />
          </Suspense>
        )
      case "modify-order":
        return (
          <Suspense fallback={<LoadingSkeleton />}>
            <ModifyOrder />
          </Suspense>
        )
      case "shopping-carts":
        return (
          <Suspense fallback={<LoadingSkeleton />}>
            <ShoppingCartsView />
          </Suspense>
        )
      default:
        return null
    }
  }

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

        <FadeInTransition position="bottom">
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

            {/* Renderizado condicional del contenido */}
            <div className="min-h-[500px]"> {/* Altura mínima para evitar saltos de layout */}
              {renderTabContent()}
            </div>
          </Tabs>
        </FadeInTransition>
      </div>
    </div>
  )
}
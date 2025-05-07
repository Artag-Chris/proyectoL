import { FadeInTransition } from "@/components/transitions/FadeIn"
import { TabsContent } from "@radix-ui/react-tabs"
import { Search, Filter, ArrowUpDown, Clock, CheckCircle2 } from "lucide-react"
import { OrderCard } from "./OrderCard"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
interface Order {
  id: string
  status: 'Pendiente' | 'Entregado' | 'Cancelado'
  // ... otras propiedades
}

interface ViewOrdersTabProps {
  searchTerm: string
  statusFilter: string
  sortOrder: string
  orders: any[]
  setSearchTerm: (value: string) => void
  setStatusFilter: (value: string) => void
  setSortOrder: (value: string) => void
}

export default function ViewOrdersTabs({
  searchTerm,
  statusFilter,
  sortOrder,
  orders,
  setSearchTerm,
  setStatusFilter,
  setSortOrder
}: ViewOrdersTabProps) {

    const filteredOrders = orders.filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item:any) => item.toLowerCase().includes(searchTerm.toLowerCase()))
  
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
    <TabsContent value="view-orders" className="space-y-8 mt-0">
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
                placeholder="Buscar por ID, cliente o producto..."
                value={searchTerm}
                onChange={(e:any) => setSearchTerm(e.target.value)}
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
          <HeaderSection 
            status={statusFilter} 
            count={sortedOrders.length} 
          />
          <OrderList orders={sortedOrders} status={statusFilter} />
        </div>
      ) : (
        <>
          <OrderList 
            title="Pedidos Pendientes"
            orders={pendingOrders}
            icon={<Clock className="h-5 w-5 text-amber-500" />}
            status="Pendiente"
          />
          <Separator className="my-8" />
          <OrderList 
            title="Últimos Pedidos Entregados"
            orders={deliveredOrders}
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
            status="Entregado"
          />
        </>
      )}
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
    ) : (
      <Filter className="h-5 w-5" />
    )}
    Pedidos {status}
    <Badge variant="outline" className="ml-2">{count}</Badge>
  </h2>
)

const OrderList = ({ 
  title,
  orders,
  icon,
  status
}: {
  title?: string
  orders: Order[]
  icon?: React.ReactNode
  status: string
}) => (
  <div>
    {title && (
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
        {icon}
        {title}
        <Badge variant="outline" className="ml-2">{orders.length}</Badge>
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
      {status === "all" 
        ? "No hay pedidos" 
        : `No hay pedidos ${status.toLowerCase()}`
      }
    </p>
  </Card>
)


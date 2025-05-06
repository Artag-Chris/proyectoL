import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShoppingBag, Calendar, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function OrderCard({ order }:any) {
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
  
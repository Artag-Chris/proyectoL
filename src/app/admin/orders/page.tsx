"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/transitions/PageTransition";
import { FadeInTransition } from "@/components/transitions/FadeIn";
import { orders } from "../dummy/adminDummy";



export default function OrdersPage() {
  const pendingOrders = orders.filter((order) => order.status === "Pendiente");
  const deliveredOrders = orders.filter(
    (order) => order.status === "Entregado"
  );

  return (
    <div className="space-y-10">
      <PageTransition />
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Pedidos</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
          Pedidos Pendientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingOrders.map((order) => (
            <FadeInTransition position="right">
            <OrderCard key={order.id} order={order} />
            </FadeInTransition>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
          Últimos Pedidos Entregados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveredOrders.map((order) => (
            <FadeInTransition position="right">
            <OrderCard key={order.id} order={order} />
            </FadeInTransition>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: any) {
  return (
    <Card className="backdrop-blur-md bg-white/10 border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-[var(--color-text)]">
          Pedido #{order.id}
        </CardTitle>
        <Badge variant={order.status === "Pendiente" ? "default" : "secondary"}>
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-[var(--color-text)] font-semibold mb-2">
          Cliente: {order.user}
        </p>
        <ul className="list-disc list-inside mb-2">
          {order.items.map((item: string, index: number) => (
            <li key={index} className="text-[var(--color-text)]/80">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[var(--color-text)] font-semibold">
          Total: ${order.total.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}

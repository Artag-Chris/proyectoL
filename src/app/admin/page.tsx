"use client";

import PageTransition from "@/components/transitions/PageTransition";
import DashboardDate from "@/components/admin/dashboard/DashboardDate";
import TotalIncomeCard from "@/components/admin/dashboard/TotalIncomeCard";
import SuscriptionsCard from "@/components/admin/dashboard/SuscriptionsCard";
import SellsCard from "@/components/admin/dashboard/SellsCard";
import OnlineStatsCard from "@/components/admin/dashboard/OnlineStatsCard";
import GraphMetricCard from "@/components/admin/dashboard/GraphMetricCard";
import RecentSales from "@/components/admin/dashboard/RecentSales";

/*
  Este componente es la página principal del panel de administración.
  Contiene las tarjetas de métricas, gráficos y estadísticas rápidas.
  Se utiliza para mostrar información relevante sobre el rendimiento de la aplicación.
  El diseño es responsivo y se adapta a diferentes tamaños de pantalla.
  Las tarjetas utilizan animaciones para mejorar la experiencia del usuario.
 */

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageTransition />
      <DashboardDate />
      {/* vistas rapidas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalIncomeCard />
        <SuscriptionsCard />
        <SellsCard />
        <OnlineStatsCard />
      </div>
      {/* graficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <GraphMetricCard />
        <RecentSales />
      </div>
    </div>
  );
}

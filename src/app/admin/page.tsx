"use client";

import PageTransition from "@/components/transitions/PageTransition";
import DashboardDate from "@/components/admin/dashboard/DashboardDate";
import TotalIncomeCard from "@/components/admin/dashboard/TotalIncomeCard";
import SuscriptionsCard from "@/components/admin/dashboard/SuscriptionsCard";
import SellsCard from "@/components/admin/dashboard/SellsCard";
import OnlineStatsCard from "@/components/admin/dashboard/OnlineStatsCard";
import GraphMetricCard from "@/components/admin/dashboard/GraphMetricCard";
import RecentSales from "@/components/admin/dashboard/RecentSales";

/**
 *  este componente me toca crear alguna forma de  que pueda colocar la informacion manualmente
 * para que pueda ser mostrada en el dashboard y ella poder tener la forma de actualizar 
 * sus datos
 *  TODO modularizar este componente por partes para que sea mas facil de modificar
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

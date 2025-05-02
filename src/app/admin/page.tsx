"use client";

import { Card } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DollarSign, Users, ShoppingBag, Activity } from "lucide-react";
import Image from "next/image";
import PageTransition from "@/components/transitions/PageTransition";
import { monthlyData, recentSales } from "./dummy/adminDummy";

/**
 *  este componente me toca crear alguna forma de  que pueda colocar la informacion manualmente
 * para que pueda ser mostrada en el dashboard y ella poder tener la forma de actualizar 
 * sus datos
 * 
 */

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageTransition />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Dashboard
        </h1>
        <div className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2 text-[var(--color-text)]">
          Jan 20, 2023 - Feb 09, 2023
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
               ingresos totales
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                $45,231.89
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
                +20.1% from last month
              </span>
            </div>
            <DollarSign className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
        <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
                suscripciones
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +2,350
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
                +180.1% from last month
              </span>
            </div>
            <Users className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
        <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
                ventas
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +12,234
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
                cuanto porcentaje aun aunmentado las ventas

              </span>
            </div>
            <ShoppingBag className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
        <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
                cuantas personas estan online
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +573
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
                aqui van cuantos se han suscripto en el mes
              </span>
            </div>
            <Activity className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 backdrop-blur-md bg-white/10 border-none">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                Overview
              </h2>
            </div>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="w-full aspect-[4/3]"
              >
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="revenue"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary/30"
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </Card>
        <Card className="col-span-3 backdrop-blur-md bg-white/10 border-none">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                Ventas recientes
              </h2>
            </div>
            <div className="space-y-8">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={sale.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      {sale.name}
                    </p>
                    <p className="text-sm text-[var(--color-text)]/60">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-[var(--color-text)]">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

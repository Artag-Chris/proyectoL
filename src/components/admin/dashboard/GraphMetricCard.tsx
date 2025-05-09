"use client"

import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { BarChart2, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import useGetMetricsGraph from "@/hooks/useGetMetricsGraph"

function GraphMetricCard() {
  const { data: response, error, loading } = useGetMetricsGraph()

  // Estado de carga mejorado
  if (loading) {
    return (
      <Card className="col-span-4 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center h-[350px]">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-[var(--color-text)]/70 text-sm">Cargando datos de métricas...</p>
        </div>
      </Card>
    )
  }

  // Estado de error mejorado
  if (error) {
    return (
      <Card className="col-span-4 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center h-[350px]">
          <div className="bg-red-500/10 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-[var(--color-text)] font-medium mb-2">Error al cargar los datos</p>
          <p className="text-[var(--color-text)]/70 text-sm text-center max-w-md">{error}</p>
        </div>
      </Card>
    )
  }

  // Aseguramos que los datos existan antes de mapearlos
  const enhancedData =
    response?.metrics?.data?.map((item) => ({
      ...item,
      users: item.users,
    })) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-4"
    >
      <Card className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden relative h-full">
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="p-6 relative">
          {/* Encabezado mejorado */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3"
              >
                <BarChart2 className="h-5 w-5 text-primary" />
              </motion.div>
              <h2 className="text-lg font-bold text-[var(--color-text)]">Métricas Mensuales</h2>
            </div>
            <div className="text-sm bg-[var(--color-text)]/5 px-3 py-1 rounded-full text-[var(--color-text)]/70">
              Último año fiscal
            </div>
          </div>

          {/* Contenedor de la gráfica con animación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Ingresos",
                    color: "hsl(var(--primary))",
                  },
                  users: {
                    label: "Usuarios",
                    color: "hsl(var(--secondary))",
                  },
                }}
              >
                <BarChart
                  data={enhancedData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 20,
                  }}
                  barGap={4}
                  barCategoryGap={16}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-text)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    opacity={0.7}
                  />
                  <YAxis
                    stroke="var(--color-text)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    width={50}
                    opacity={0.7}
                  />
                  <ChartTooltip
                    cursor={{ fill: "rgba(var(--color-text-rgb), 0.05)" }}
                    content={<ChartTooltipContent />}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                  />
                  <Bar
                    dataKey="revenue"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary/80"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Bar
                    dataKey="users"
                    radius={[4, 4, 0, 0]}
                    className="fill-secondary/80"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                    animationBegin={300}
                  />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default GraphMetricCard
"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import useGetTotalIncome from "@/hooks/useGetTotalIncome"
import { cn } from "@/lib/utils"

function TotalIncomeCard() {
  const { data: response, loading, error } = useGetTotalIncome()

  // Extraer datos con manejo seguro para evitar errores
  const totalIncome = response?.response?.data?.totalIncome || 0
  const lastMonthIncome = response?.response?.data?.previousMonth?.income || 0
  const currentMonthIncome = response?.response?.data?.currentMonth?.income || 0
  const percentageIncrease = response?.response?.data?.percentageChange || 0

  // Determinar si el cambio es positivo o negativo
  const isPositiveChange = percentageIncrease >= 0

  // Renderizar estado de carga
  if (loading) {
    return (
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <div className="p-6 flex items-center justify-center h-[140px]">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </Card>
    )
  }

  // Renderizar estado de error
  if (error) {
    return (
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <div className="p-6 flex items-center justify-center h-[140px]">
          <p className="text-sm text-red-500">Error al cargar datos</p>
        </div>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden relative h-full">
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-300/20 to-blue-300/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="p-6 relative">
          {/* Encabezado con ícono */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-text)]/70 flex items-center">Ingresos totales</h3>
            <motion.div
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center"
            >
              <DollarSign className="h-5 w-5 text-green-500" />
            </motion.div>
          </div>

          {/* Valor principal con animación */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-3xl font-bold text-[var(--color-text)]">
              $<CountUp end={totalIncome} duration={2} separator="," decimals={2} />
            </span>
          </motion.div>

          {/* Comparativa mensual */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1">Mes actual</p>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                ${new Intl.NumberFormat().format(currentMonthIncome)}
              </p>
            </div>
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1">Mes anterior</p>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                ${new Intl.NumberFormat().format(lastMonthIncome)}
              </p>
            </div>
          </div>

          {/* Indicador de cambio porcentual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={cn(
              "flex items-center text-xs font-medium rounded-full px-2 py-1 w-fit",
              isPositiveChange ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10",
            )}
          >
            {isPositiveChange ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <CountUp
              end={Math.abs(percentageIncrease)}
              duration={2}
              decimals={1}
              suffix="%"
              prefix={isPositiveChange ? "+" : "-"}
            />
            <span className="ml-1">vs. mes anterior</span>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default TotalIncomeCard

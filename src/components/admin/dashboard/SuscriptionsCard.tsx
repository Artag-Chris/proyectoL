"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Users, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import useGetClientsStats from "@/hooks/useGetClientStats"
import { cn } from "@/lib/utils"

function SubscriptionsCard() {
  const { data:response, loading, error } = useGetClientsStats()

  // Extraer datos con manejo seguro para evitar errores
  const totalSubscriptions = response?.response?.totalUsuarios
  const percentageIncrease = response?.response?.subscriptions?.percentageChange || 0
  const previousMonth = response?.response?.subscriptions?.previousMonth?.count || 0
  const currentMonth = response?.response?.subscriptions?.currentMonth?.count || 0

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
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-300/20 to-blue-300/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="p-6 relative">
          {/* Encabezado con ícono */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-text)]/70 flex items-center capitalize">
              Suscripciones
            </h3>
            <motion.div
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center"
            >
              <Users className="h-5 w-5 text-purple-500" />
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
              <CountUp end={totalSubscriptions} duration={2.5} separator="," prefix="+" />
            </span>
          </motion.div>

          {/* Comparativa mensual */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1">Mes actual</p>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                +{new Intl.NumberFormat().format(currentMonth)}
              </p>
            </div>
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1">Mes anterior</p>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                +{new Intl.NumberFormat().format(previousMonth)}
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
              isPositiveChange ? "text-purple-500 bg-purple-500/10" : "text-red-500 bg-red-500/10",
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

export default SubscriptionsCard

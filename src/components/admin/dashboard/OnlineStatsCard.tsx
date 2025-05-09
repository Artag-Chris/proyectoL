"use client"

import { Card } from "@/components/ui/card"
import { Users, Wifi, Clock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Badge } from "@/components/ui/badge"

function OnlineStatsCard() {
  // Datos de ejemplo (placeholder)
  const onlineUsers = 120
  const peakToday = 156
  const averageTime = 24 // minutos
  //TODO buscar alguna forma de obtener estos datos lo dejare para mi yo del futuro

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Card className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden relative h-full">
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-300/20 to-cyan-300/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        {/* Indicador de "No implementado" */}
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            No implementado
          </Badge>
        </div>

        <div className="p-6 relative">
          {/* Encabezado con ícono */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-text)]/70 flex items-center">Usuarios en línea</h3>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 130, delay: 0.3 }}
              className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center"
            >
              <Users className="h-5 w-5 text-blue-500" />
            </motion.div>
          </div>

          {/* Valor principal con animación */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[var(--color-text)]">
                <CountUp end={onlineUsers} duration={1.8} />
              </span>
              <Wifi className="h-4 w-4 ml-2 text-green-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Estadísticas adicionales */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1 flex items-center">
                <Users className="h-3 w-3 mr-1" />
                Pico de hoy
              </p>
              <p className="text-sm font-semibold text-[var(--color-text)]">{peakToday} usuarios</p>
            </div>
            <div className="bg-[var(--color-text)]/5 rounded-md p-2">
              <p className="text-xs text-[var(--color-text)]/60 mb-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Tiempo promedio
              </p>
              <p className="text-sm font-semibold text-[var(--color-text)]">{averageTime} min</p>
            </div>
          </div>

          {/* Nota de implementación futura */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-[var(--color-text)]/60 mt-2 bg-blue-500/5 p-2 rounded-md border border-blue-500/10"
          >
            <p className="flex items-start">
              <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
              <span>
                Esta funcionalidad se implementará próximamente. Los datos mostrados son simulados para fines de diseño.
              </span>
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default OnlineStatsCard
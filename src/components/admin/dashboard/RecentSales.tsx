"use client"

import { recentSales } from "@/app/admin/dummy/adminDummy"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, Award, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import useGetRecentSales from "@/hooks/useGetRecentSales"

/*
 * COMPONENTE DE VENTAS RECIENTES
 *
 * ESTRUCTURA DE DATOS REQUERIDA:
 * Para implementar este componente con datos reales, necesitas un array de objetos con esta estructura:
 * [
 *   {
 *     id: string | number,       // Identificador único de la venta
 *     name: string,              // Nombre del cliente
 *     email: string,             // Email del cliente
 *     amount: string,            // Monto de la venta (formateado como string, ej: "$150.00")
 *     amountValue: number,       // Monto numérico para cálculos (ej: 150)
 *     status: "completed" | "pending" | "failed",  // Estado de la venta
 *     date: string,              // Fecha de la venta (ISO string)
 *     avatar?: string,           // URL de la imagen de avatar (opcional)
 *     isVip?: boolean,           // Si es cliente VIP (opcional)
 *     trend?: "up" | "down" | "neutral"  // Tendencia de compras del cliente (opcional)
 *   },
 *   ...
 * ]
 *
 * IMPLEMENTACIÓN CON DATOS REALES:
 *
 * 1. Crear estados para los datos y la carga:
 *    const [sales, setSales] = useState([])
 *    const [isLoading, setIsLoading] = useState(true)
 *    const [error, setError] = useState(null)
 *
 * 2. Función para obtener datos de tu API:
 *    async function fetchSales() {
 *      setIsLoading(true)
 *      try {
 *        const response = await fetch('/api/sales/recent')
 *        if (!response.ok) throw new Error('Error al cargar ventas')
 *
 *        const data = await response.json()
 *
 *        // Formatear los datos si es necesario
 *        const formattedSales = data.map(sale => ({
 *          id: sale.id,
 *          name: sale.customer.name,
 *          email: sale.customer.email,
 *          amount: new Intl.NumberFormat('es-MX', {
 *            style: 'currency',
 *            currency: 'MXN'
 *          }).format(sale.total),
 *          amountValue: sale.total,
 *          status: sale.paymentStatus,
 *          date: sale.createdAt,
 *          avatar: sale.customer.avatarUrl,
 *          isVip: sale.customer.totalSpent > 10000,
 *          trend: determineTrend(sale.customer.previousPurchases)
 *        }))
 *
 *        setSales(formattedSales)
 *      } catch (err) {
 *        setError(err.message)
 *      } finally {
 *        setIsLoading(false)
 *      }
 *    }
 *
 * 3. Usar useEffect para cargar los datos al montar el componente:
 *    useEffect(() => {
 *      fetchSales()
 *
 *      // Opcional: configurar actualizaciones en tiempo real
 *      const interval = setInterval(fetchSales, 60000) // Actualizar cada minuto
 *      return () => clearInterval(interval)
 *    }, [])
 *
 * 4. Para implementar tiempo real con WebSockets:
 *    useEffect(() => {
 *      // Cargar datos iniciales
 *      fetchSales()
 *
 *      // Configurar WebSocket
 *      const socket = new WebSocket('wss://tu-servidor.com/ws/sales')
 *
 *      socket.onmessage = (event) => {
 *        const newSale = JSON.parse(event.data)
 *        setSales(prevSales => {
 *          // Añadir la nueva venta al principio y mantener solo las 5 más recientes
 *          const updatedSales = [newSale, ...prevSales].slice(0, 5)
 *          return updatedSales
 *        })
 *      }
 *
 *      return () => socket.close()
 *    }, [])
 */

function RecentSales() {
  const {sales,error,loading}=useGetRecentSales()
  interface Sale {
    id: string | number;
    name: string;
    email: string;
    amount: string;
    isNew?: boolean;
  }

  // Estado para controlar las animaciones de nuevas ventas
  const [animatedSales, setAnimatedSales] = useState<Sale[]>([])

  // Simulamos la llegada de una nueva venta cada 10 segundos
  useEffect(() => {
    // Inicializamos con los datos existentes
    setAnimatedSales(sales as Sale[])

    // Simulación de nuevas ventas (solo para demo)
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * recentSales.length)
      const newSale = { ...recentSales[randomIndex], isNew: true } as Sale

      setAnimatedSales((prev: Sale[]) => {
        // Añadir al principio y mantener solo 5 elementos
        const updated = [newSale, ...prev.slice(0, 4)]
        return updated
      })

      // Quitar la marca de "nuevo" después de la animación
      setTimeout(() => {
        setAnimatedSales((prev: Sale[]) => prev.map((sale, idx) => (idx === 0 ? { ...sale, isNew: false } : sale)))
      }, 3000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Función para determinar cuánto tiempo ha pasado
  const getTimeAgo = () => {
    // En un caso real, usaríamos la fecha real
    // Aquí simulamos tiempos aleatorios para la demo
    const times = ["Hace 5 min", "Hace 20 min", "Hace 1 hora", "Hace 3 horas", "Hoy"]
    return times[Math.floor(Math.random() * times.length)]
  }

  // Función para obtener un color basado en el monto
  const getAmountColor = (amount: string): string => {
    // Extraemos el valor numérico del string "$150.00"
    const value = Number.parseFloat(amount.replace(/[^0-9.-]+/g, ""))

    if (value > 1000) return "text-emerald-500 dark:text-emerald-400"
    if (value > 500) return "text-amber-500 dark:text-amber-400"
    return "text-[var(--color-text)]"
  }

  // Datos enriquecidos para la demo
  const enhancedSales = animatedSales.map((sale, index) => ({
    ...sale,
    status: ["completed", "pending", "completed", "completed", "failed"][index % 5],
    trend: ["up", "down", "up", "neutral", "up"][index % 5],
    isVip: index % 3 === 0,
  }))

  return (
    <Card className="col-span-3 backdrop-blur-md bg-white/10 border-none overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Ventas recientes
          </h2>
          <Badge variant="outline" className="bg-[var(--color-text)]/5">
            <Clock className="mr-1 h-3 w-3" /> En tiempo real
          </Badge>
        </div>

        <div className="space-y-6">
          {enhancedSales.map((sale, index) => (
            <motion.div
              key={`${sale.email}-${index}`}
              initial={sale.isNew ? { x: -50, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-3 rounded-lg ${sale.isNew ? "bg-green-500/10 dark:bg-green-900/20" : "hover:bg-[var(--color-text)]/5"} transition-colors`}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-[var(--color-text)]/10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${sale.name.charAt(0)}`}
                    alt={sale.name}
                  />
                  <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {sale.isVip && (
                  <div className="absolute -top-1 -right-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
              </div>

              <div className="ml-4 space-y-1 flex-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-[var(--color-text)]">{sale.name}</p>
                  {sale.status === "completed" && (
                    <Badge variant="default" className="ml-2 bg-green-500/80 hover:bg-green-500 text-[10px] py-0">
                      Completada
                    </Badge>
                  )}
                  {sale.status === "pending" && (
                    <Badge variant="outline" className="ml-2 text-[10px] py-0">
                      Pendiente
                    </Badge>
                  )}
                  {sale.status === "failed" && (
                    <Badge variant="destructive" className="ml-2 text-[10px] py-0">
                      Fallida
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-xs text-[var(--color-text)]/60">
                  <p>{sale.email}</p>
                  <span className="mx-2">•</span>
                  <p>{getTimeAgo()}</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className={`font-medium ${getAmountColor(sale.amount)}`}>{sale.amount}</div>
                <div className="flex items-center text-xs mt-1">
                  {sale.trend === "up" && (
                    <div className="flex items-center text-emerald-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>Cliente frecuente</span>
                    </div>
                  )}
                  {sale.trend === "down" && (
                    <div className="flex items-center text-red-500">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span>Primera compra</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default RecentSales

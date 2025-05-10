"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, Award, Zap, Loader2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import useGetRecentSales from "@/hooks/useGetRecentSales"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

// Define the Sale interface to match what comes from the hook
interface Sale {
  id: number
  name: string
  email: string
  amount: string
  amountValue: number
  status: "completed" | "pending" | "failed"
  date: string
  avatar?: string
  isVip?: boolean
  trend?: "up" | "down" | "neutral"
  isNew?: boolean
}

function RecentSales() {
  const { sales, loading, error } = useGetRecentSales()
  const [animatedSales, setAnimatedSales] = useState<Sale[]>([])
  const [newSaleAdded, setNewSaleAdded] = useState(false)

  // Update animated sales whenever the API data changes
  useEffect(() => {
    if (sales && sales.length > 0) {
      // Check if we have new sales compared to what we already have
      if (animatedSales.length > 0 && sales[0]?.id !== animatedSales[0]?.id) {
        // Mark the new sales as "new" for animation
        const newSalesWithFlag = sales.map((sale, index) => {
          // Check if this sale already exists in our current list
          const exists = animatedSales.some((existing) => existing.id === sale.id)
          return {
            ...sale,
            isNew: !exists && index === 0, // Only animate the first new item
          }
        })

        setAnimatedSales(newSalesWithFlag)
        setNewSaleAdded(true)

        // Remove the "new" flag after animation completes
        setTimeout(() => {
          setAnimatedSales((prev) => prev.map((sale) => ({ ...sale, isNew: false })))
          setNewSaleAdded(false)
        }, 3000)
      } else if (animatedSales.length === 0) {
        // Initial load
        setAnimatedSales(sales)
      }
    }
  }, [sales])

  // Function to format the time ago from an ISO date string
  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: es })
    } catch (e) {
      return "Fecha desconocida"
    }
  }

  // Function to get color based on amount
  const getAmountColor = (amount: string): string => {
    // Extract numeric value from string like "$150.00"
    const value = Number.parseFloat(amount.replace(/[^0-9.-]+/g, ""))

    if (value > 1000) return "text-emerald-500 dark:text-emerald-400"
    if (value > 500) return "text-amber-500 dark:text-amber-400"
    return "text-[var(--color-text)]"
  }

  // Loading state
  if (loading) {
    return (
      <Card className="col-span-3 backdrop-blur-md bg-white/10 border-none overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-[var(--color-text)] font-medium">Cargando ventas recientes...</p>
        </div>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card className="col-span-3 backdrop-blur-md bg-white/10 border-none overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center h-[400px]">
          <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error al cargar ventas</p>
          <p className="text-[var(--color-text)]/70 text-center max-w-md">{error}</p>
        </div>
      </Card>
    )
  }

  // Empty state
  if (!animatedSales || animatedSales.length === 0) {
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

          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <p className="text-[var(--color-text)]/70">No hay ventas recientes para mostrar</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="col-span-3 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none overflow-hidden">
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
          {animatedSales.map((sale, index) => (
            <motion.div
              key={`${sale.id}-${index}`}
              initial={sale.isNew ? { x: -50, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-3 rounded-lg ${sale.isNew ? "bg-green-500/10 dark:bg-green-900/20" : "hover:bg-[var(--color-text)]/5"} transition-colors`}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-[var(--color-text)]/10">
                  <AvatarImage
                    src={sale.avatar || `/placeholder.svg?height=40&width=40&text=${sale.name.charAt(0)}`}
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
                  <p>{getTimeAgo(sale.date)}</p>
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

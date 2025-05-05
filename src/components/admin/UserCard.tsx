"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin, ShieldCheck, Calendar, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export interface User {
  id: number
  email: string
  firstName?: string | null
  lastName?: string | null
  address?: string | null
  phoneNumber?: string | null
  profileImage?: string | null
  createdAt: string | Date
  isAvailable: boolean
  isAdmin: boolean
}

interface UserCardProps {
  user: any
}

export function UserCard({ user }: UserCardProps) {
  const router = useRouter()
  const [isAvailable, setIsAvailable] = useState(user.isAvailable)
  const [isUpdating, setIsUpdating] = useState(false)

  // Función para actualizar la disponibilidad del usuario
  const handleAvailabilityToggle = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevenir navegación al hacer clic en el switch

    const newState = !isAvailable
    setIsUpdating(true)

    try {
      // Llamada a la API para actualizar el estado
      const response = await fetch(`http://localhost:45623/api/usuarios/cliente/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAvailable: newState }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la disponibilidad")
      }

      // Actualizar el estado local después de una actualización exitosa
      setIsAvailable(newState)
      toast.success(`Usuario ${newState ? "activado" : "desactivado"} correctamente`)
    } catch (error) {
      console.error("Error:", error)
      toast.error("No se pudo actualizar el estado del usuario")
    } finally {
      setIsUpdating(false)
    }
  }

  // Navegar a la página de detalles del usuario
  const navigateToUserDetails = () => {
    router.push(`/admin/users/${user.id}`)
  }

  // Formatear la fecha de creación
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Obtener el nombre completo o un placeholder
  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.lastName || "Usuario sin nombre"

  // Obtener iniciales para el avatar
  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user.firstName) return user.firstName[0].toUpperCase()
    if (user.lastName) return user.lastName[0].toUpperCase()
    return user.email[0].toUpperCase()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        onClick={navigateToUserDetails}
        className={cn(
          "h-full overflow-hidden border-0 transition-all duration-300 cursor-pointer",
          "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md",
          "hover:shadow-lg relative group",
          isAvailable ? "ring-1 ring-white/20 hover:ring-primary/30" : "grayscale-[30%] ring-1 ring-white/10",
        )}
      >
        {/* Efecto de brillo en las esquinas */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 blur transition duration-500 group-hover:opacity-100" />

        <div className="relative p-6 flex flex-col h-full">
          {/* Cabecera con avatar y badges */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage
                  src={user.profileImage || `/placeholder.svg?height=48&width=48&text=${getInitials()}`}
                  alt={fullName}
                />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] line-clamp-1">{fullName}</h3>
                <p className="text-sm text-[var(--color-text)]/70">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              {user.isAdmin && (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
              <Badge
                variant={isAvailable ? "default" : "outline"}
                className={cn(isAvailable ? "bg-green-500/80 hover:bg-green-500" : "text-muted-foreground")}
              >
                {isAvailable ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-2 mb-6">
            {user.phoneNumber && (
              <div className="flex items-center text-sm text-[var(--color-text)]/70">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{user.phoneNumber}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-start text-sm text-[var(--color-text)]/70">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{user.address}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-[var(--color-text)]/70">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Registrado: {formatDate(user.createdAt)}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <Button
              size="sm"
              variant="outline"
              className="text-primary"
              onClick={(e) => {
                e.stopPropagation()
                navigateToUserDetails()
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Detalles
            </Button>

            {/* Toggle de disponibilidad */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <span
                className={cn("text-xs font-medium", isAvailable ? "text-green-500" : "text-[var(--color-text)]/50")}
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : isAvailable ? "Activo" : "Inactivo"}
              </span>
              <Switch
                checked={isAvailable}
                onCheckedChange={() => {}}
                onClick={handleAvailabilityToggle}
                className={cn("data-[state=checked]:bg-green-500", isUpdating && "opacity-50 cursor-not-allowed")}
                disabled={isUpdating}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

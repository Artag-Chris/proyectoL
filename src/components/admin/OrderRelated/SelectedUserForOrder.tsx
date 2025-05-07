"use client"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface User {
  id: number
  email: string
  firstName?: string | null
  lastName?: string | null
  address?: string | null
  phoneNumber?: string | null
  profileImage?: string | null
  createdAt: string | Date
  isAdmin?: boolean
}

interface SelectableUserCardProps {
  user: User
  isSelected: boolean
  onSelect: (user: User) => void
}

export function SelectableUserCard({ user, isSelected, onSelect }: SelectableUserCardProps) {
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
        className={cn(
          "h-full overflow-hidden border-0 transition-all duration-300",
          "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md",
          "hover:shadow-lg relative group",
          isSelected ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-white/20 hover:ring-primary/30",
        )}
      >
        {/* Efecto de brillo en las esquinas */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur transition duration-500",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        />

        <div className="relative p-6 flex flex-col h-full">
          {/* Indicador de selección */}
          {isSelected && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
          )}

          {/* Cabecera con avatar */}
          <div className="flex items-start mb-4">
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

          {/* Botón de selección */}
          <div className="flex items-center justify-center mt-auto pt-4 border-t border-white/10">
            <Button
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className={cn("w-full", isSelected ? "" : "text-primary")}
              onClick={() => onSelect(user)}
            >
              {isSelected ? "Seleccionado" : "Seleccionar Cliente"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

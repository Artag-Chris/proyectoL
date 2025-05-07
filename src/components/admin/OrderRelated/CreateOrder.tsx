"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Search, User, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"

import { toast } from "sonner"
import PageTransition from "@/components/transitions/PageTransition"
import { SelectableUserCard , type User as UserType } from "./SelectedUserForOrder"
import useGetUsuarios from "@/hooks/useGetUsuarios"

// Datos de ejemplo para demostración


export default function CreateOrderPage() {
  const { data: users, loading, error, refreshData } = useGetUsuarios()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  
  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.usuarios.filter((user: any) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase()
    const email = user.email.toLowerCase()
    const searchLower = searchTerm.toLowerCase()

    return fullName.includes(searchLower) || email.includes(searchLower)
  })

  // Manejar la selección de un usuario
  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user === selectedUser ? null : user)
    if (user !== selectedUser) {
      toast.success(`Cliente seleccionado: ${user.firstName} ${user.lastName}`)
    }
  }

  // Continuar al siguiente paso (selección de productos)
  const handleContinue = (selectedUser: UserType) => {
    if (selectedUser) {
      toast.info("Continuando a selección de productos...")
      // Aquí iría la lógica para pasar al siguiente paso
      // Por ejemplo, cambiar a otra pestaña o cargar productos
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />

      <div className="max-w-7xl mx-auto">
        <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <PlusCircle className="h-6 w-6 text-primary" />
              Crear Nuevo Pedido
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  Seleccionar Cliente
                </h2>

                {/* Buscador */}
                <div className="relative max-w-md w-full mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white/50"
                  />
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-lg font-medium text-[var(--color-text)]">Cargando clientes...</p>
                    </div>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                      <SelectableUserCard
                        key={user.id}
                        user={user as UserType}
                        isSelected={selectedUser?.id === user.id}
                        onSelect={() => handleSelectUser(user as UserType)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                      {searchTerm
                        ? `No se encontraron clientes que coincidan con "${searchTerm}"`
                        : "No hay clientes disponibles"}
                    </p>
                    {searchTerm && (
                      <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                        Mostrar todos los clientes
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-between py-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button onClick={() => handleContinue(selectedUser as UserType)} disabled={!selectedUser} className="gap-2">
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

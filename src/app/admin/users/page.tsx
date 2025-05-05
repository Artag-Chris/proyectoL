"use client"

import { useState, useEffect } from "react"
import { UserCard } from "@/components/admin/UserCard"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import useGetUsuarios from "@/hooks/useGetUsuarios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateUserForm } from "@/components/admin/CreateUserForm"
import { Users, Search, UserPlus, Loader2, RefreshCw } from "lucide-react"

export default function UsersPage() {
  const { data, loading, error, refreshData } = useGetUsuarios()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("list")

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = data?.usuarios?.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      user.email?.toLowerCase().includes(searchLower) ||
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.phoneNumber?.toLowerCase().includes(searchLower) ||
      user.address?.toLowerCase().includes(searchLower)
    )
  })

  const handleRefresh = () => {
    refreshData()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium text-[var(--color-text)]">Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-red-600 dark:text-red-400">Error al cargar usuarios</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{error}</p>
            <Button className="mt-4 w-full" onClick={handleRefresh}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-400/40 to-yellow-200/40">
      <PageTransition />
      <FadeInTransition position="right">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Encabezado con título y contador */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-[var(--color-text)]">Usuarios</h1>
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                {data?.usuarios?.length || 0}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleRefresh} title="Actualizar">
                <RefreshCw className="h-4 w-4" />
              </Button>

              {activeTab === "list" && (
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white/50 border-none"
                  />
                </div>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Lista de Usuarios
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Crear Usuario
              </TabsTrigger>
            </TabsList>

            <Separator className="my-6" />

            <TabsContent value="list" className="mt-0">
              {filteredUsers && filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No se encontraron usuarios que coincidan con "{searchTerm}"
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                    Mostrar todos los usuarios
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No hay usuarios disponibles</p>
                  <Button variant="default" className="mt-4" onClick={() => setActiveTab("create")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Crear nuevo usuario
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <CreateUserForm
                onSuccess={() => {
                  setActiveTab("list")
                  refreshData()
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </FadeInTransition>
    </div>
  )
}

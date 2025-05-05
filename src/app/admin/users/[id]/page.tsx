"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Mail,
  User,
  Phone,
  MapPin,
  Lock,
  ShieldCheck,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { toast } from "sonner"
import PageTransition from "@/components/transitions/PageTransition"
import { FadeInTransition } from "@/components/transitions/FadeIn"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id 

  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    profileImage: "",
    isAdmin: false,
    isAvailable: true,
    createdAt: "",
  })

  // Cargar datos del usuario
  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:45623/api/usuarios/admin/user/${userId}` )

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del usuario")
        }

        const userData = await response.json()

        setFormData({
          email: userData.email || "",
          password: "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          address: userData.address || "",
          phoneNumber: userData.phoneNumber || "",
          profileImage: userData.profileImage || "",
          isAdmin: userData.isAdmin || false,
          isAvailable: userData.isAvailable !== undefined ? userData.isAvailable : true,
          createdAt: userData.createdAt || new Date().toISOString(),
        })

        if (userData.profileImage) {
          setProfileImagePreview(userData.profileImage)
        }
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfileImage(null)
      // No resetear la vista previa si ya hay una imagen guardada
      if (!formData.profileImage) {
        setProfileImagePreview(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear FormData para enviar la imagen
      const formDataToSend = new FormData()

      // Añadir todos los campos del formulario excepto password si está vacío
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "password" || (key === "password" && value)) {
          formDataToSend.append(key, value.toString())
        }
      })

      // Añadir la imagen si existe
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage)
      }

      // Enviar datos a la API
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el usuario")
      }

      toast.success("Usuario actualizado correctamente")

      // Resetear el campo de contraseña
      setFormData((prev) => ({ ...prev, password: "" }))
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al actualizar el usuario")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al eliminar el usuario")
      }

      toast.success("Usuario eliminado correctamente")
      router.push("/admin/users")
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al eliminar el usuario")
    }
  }

  // Obtener iniciales para el avatar
  const getInitials = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase()
    }
    if (formData.firstName) return formData.firstName[0].toUpperCase()
    if (formData.lastName) return formData.lastName[0].toUpperCase()
    return formData.email ? formData.email[0].toUpperCase() : "U"
  }

  // Formatear la fecha de creación
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium text-[var(--color-text)]">Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-red-600 dark:text-red-400">Error</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{error}</p>
            <div className="flex gap-3 mt-4">
              <Button className="w-full" onClick={() => router.push("/admin/users")}>
                Volver a Usuarios
              </Button>
              <Button className="w-full" onClick={() => window.location.reload()}>
                Reintentar
              </Button>
            </div>
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
          {/* Encabezado con botón de regreso */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => router.push("/admin/users")} className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Editar Usuario</h1>
          </div>

          <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {formData.firstName || formData.lastName
                    ? `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
                    : formData.email}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={formData.isAvailable ? "default" : "outline"}
                    className={formData.isAvailable ? "bg-green-500/80 hover:bg-green-500" : "text-muted-foreground"}
                  >
                    {formData.isAvailable ? "Activo" : "Inactivo"}
                  </Badge>
                  {formData.isAdmin && (
                    <Badge className="bg-amber-500 hover:bg-amber-600">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              {formData.createdAt && (
                <p className="text-sm text-muted-foreground">Registrado: {formatDate(formData.createdAt)}</p>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="basic" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Información Básica
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contacto
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Configuración
                    </TabsTrigger>
                  </TabsList>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Columna izquierda - Formulario */}
                    <div className="md:col-span-2">
                      <TabsContent value="basic" className="space-y-6 mt-0">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Correo Electrónico
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="bg-white/50"
                              placeholder="correo@ejemplo.com"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-base flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Nueva Contraseña
                            </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="bg-white/50"
                              placeholder="••••••••"
                            />
                            <p className="text-xs text-muted-foreground">
                              Dejar en blanco para mantener la contraseña actual.
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-base">
                              Nombre
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="bg-white/50"
                              placeholder="Nombre"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-base">
                              Apellido
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="bg-white/50"
                              placeholder="Apellido"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="profileImage" className="text-base flex items-center gap-2">
                            <ImagePlus className="h-4 w-4" />
                            Imagen de Perfil
                          </Label>
                          <div className="bg-white/50 border rounded-md p-4">
                            <Input
                              id="profileImage"
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={handleImageChange}
                              className="bg-white"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Formatos aceptados: JPG, JPEG, PNG. Tamaño máximo: 5MB.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="contact" className="space-y-6 mt-0">
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="text-base flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Número de Teléfono
                          </Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="bg-white/50"
                            placeholder="+52 123 456 7890"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-base flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Dirección
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="bg-white/50"
                            placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="settings" className="space-y-6 mt-0">
                        <div className="space-y-4">
                          <div className="bg-white/50 p-4 rounded-md space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="isAdmin" className="text-base font-medium flex items-center gap-2">
                                  <ShieldCheck className="h-4 w-4 text-amber-500" />
                                  Permisos de Administrador
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Otorga acceso completo al panel de administración
                                </p>
                              </div>
                              <Switch
                                id="isAdmin"
                                checked={formData.isAdmin}
                                onCheckedChange={(checked) => handleSwitchChange("isAdmin", checked)}
                                className="data-[state=checked]:bg-amber-500"
                              />
                            </div>
                          </div>

                          <div className="bg-white/50 p-4 rounded-md space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="isAvailable" className="text-base font-medium">
                                  Estado de la Cuenta
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Determina si el usuario puede acceder a su cuenta
                                </p>
                              </div>
                              <Switch
                                id="isAvailable"
                                checked={formData.isAvailable}
                                onCheckedChange={(checked) => handleSwitchChange("isAvailable", checked)}
                                className="data-[state=checked]:bg-green-500"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                          <h3 className="text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Zona de Peligro
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 mb-4">
                            Las siguientes acciones son irreversibles. Proceda con precaución.
                          </p>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" className="w-full">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar Usuario
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente la cuenta de usuario
                                  y todos los datos asociados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TabsContent>
                    </div>

                    {/* Columna derecha - Vista previa */}
                    <div className="md:col-span-1">
                      <div className="sticky top-6 space-y-6 bg-white/30 p-4 rounded-lg border border-white/20">
                        <h3 className="font-medium text-center mb-4">Vista Previa</h3>

                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-20 w-20 border-2 border-white/20">
                            <AvatarImage
                              src={profileImagePreview || `/placeholder.svg?height=80&width=80&text=${getInitials()}`}
                              alt="Vista previa"
                            />
                            <AvatarFallback>{getInitials()}</AvatarFallback>
                          </Avatar>

                          <div className="text-center">
                            <h4 className="font-medium text-lg">
                              {formData.firstName || formData.lastName
                                ? `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
                                : "Nombre del Usuario"}
                            </h4>
                            <p className="text-sm text-muted-foreground">{formData.email}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center">
                            {formData.isAdmin && (
                              <Badge className="bg-amber-500 hover:bg-amber-600">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                            <Badge
                              variant={formData.isAvailable ? "default" : "outline"}
                              className={
                                formData.isAvailable ? "bg-green-500/80 hover:bg-green-500" : "text-muted-foreground"
                              }
                            >
                              {formData.isAvailable ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>

                          {(formData.phoneNumber || formData.address) && (
                            <div className="w-full space-y-2 mt-2 text-sm">
                              {formData.phoneNumber && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-muted-foreground" />
                                  <span className="truncate">{formData.phoneNumber}</span>
                                </div>
                              )}
                              {formData.address && (
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                                  <span className="line-clamp-2">{formData.address}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push("/admin/users")}>
                      Cancelar
                    </Button>

                    <Button type="submit" className="min-w-[120px]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Guardar Cambios
                        </>
                      )}
                    </Button>
                  </div>
                </Tabs>
              </form>
            </CardContent>
          </Card>
        </div>
      </FadeInTransition>
    </div>
  )
}

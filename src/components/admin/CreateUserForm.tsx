"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Mail, User, Phone, MapPin, Lock, ShieldCheck, ImagePlus, Loader2, Check } from "lucide-react"
import { toast } from "sonner"

interface CreateUserFormProps {
  onSuccess?: () => void
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    isAdmin: false,
    isAvailable: true,
  })

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
      setProfileImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear un objeto FormData
      const formDataToSend = new FormData()

      // Añadir todos los campos del formulario como strings
      Object.entries(formData).forEach(([key, value]) => {
        // Convertir booleanos a strings para asegurar compatibilidad
        if (typeof value === "boolean") {
          formDataToSend.append(key, value ? "true" : "false")
        } else {
          // Asegurarse de que el valor no sea undefined o null
          formDataToSend.append(key, value === null || value === undefined ? "" : String(value))
        }
      })

      // Añadir la imagen si existe
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage)
      }

      // Depuración - mostrar los valores que se están enviando
      console.log("Enviando datos:")
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value instanceof File ? `File: ${value.name}` : value}`)
      }

      // Enviar la petición sin especificar Content-Type (el navegador lo añadirá automáticamente)
      const response = await fetch("http://localhost:45623/api/usuarios/admin/usuario", {
        method: "POST",
        body: formDataToSend,
        // No incluir Content-Type para que el navegador lo establezca correctamente con el boundary
      })

      // Verificar la respuesta del servidor
      const responseText = await response.text()
      console.log("Respuesta del servidor:", responseText)

      let responseData
      try {
        // Intentar parsear como JSON si es posible
        responseData = JSON.parse(responseText)
      } catch (e) {
        // Si no es JSON, usar el texto como está
        responseData = { message: responseText }
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Error al crear el usuario")
      }

      toast.success("Usuario creado correctamente")

      // Resetear formulario
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        isAdmin: false,
        isAvailable: true,
      })
      setProfileImage(null)
      setProfileImagePreview(null)

      // Llamar al callback de éxito si existe
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al crear el usuario")
    } finally {
      setIsSubmitting(false)
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

  return (
    <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            Crear Nuevo Usuario
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Nuevo
          </Badge>
        </div>
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
                        Contraseña
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
                        Opcional. Si no se proporciona, el usuario deberá establecerla.
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
                      <p className="text-sm text-muted-foreground">{formData.email || "correo@ejemplo.com"}</p>
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

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("basic")}
                disabled={activeTab === "basic"}
              >
                Anterior
              </Button>

              {activeTab !== "settings" ? (
                <Button
                  type="button"
                  onClick={() => {
                    if (activeTab === "basic") setActiveTab("contact")
                    if (activeTab === "contact") setActiveTab("settings")
                  }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" className="min-w-[120px]" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Crear Usuario
                    </>
                  )}
                </Button>
              )}
            </div>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}

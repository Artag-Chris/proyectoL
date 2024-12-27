'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'


//se quitara el icono de twitter y  se agrandaran los iconos de google y facebook
//con el fin de que el usuario quiera usarlos mas y nos ayude a identificar mas facil nuestros usuario
//se colocaran mas peque;os los inputs los simbolos de google y facebook sera mas protagonistas
//y tendran animaciones 
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result?.ok) {
        router.push('/')
      } else {
        console.error('Login failed')
      }
    } else {
      console.log('Register with', email, password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/30 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              {isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/30 px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => signIn('google')} variant="outline" size="icon" className="bg-white/50">
              <FaGoogle className="h-4 w-4" />
            </Button>
            <Button onClick={() => signIn('facebook')} variant="outline" size="icon" className="bg-white/50">
              <FaFacebook className="h-4 w-4" />
            </Button>
            <Button onClick={() => signIn('twitter')} variant="outline" size="icon" className="bg-white/50">
              <FaTwitter className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


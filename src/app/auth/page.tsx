'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

async function sendUserDataToBackend(userData: any) {
  try {
    const response = await fetch('http://localhost:45623/auth/social-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending user data to backend:', error)
    throw error
  }
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSocialLogin = async (provider: string) => {
    try {
      const result:any = await signIn(provider, {
        redirect: false,
      })
      
      if (result?.ok && result.user) {
        await sendUserDataToBackend({
          provider,
          userData: result.user,
          timestamp: new Date().toISOString(),
        })
        router.push('/')
      }
    } catch (error) {
      console.error(`Error during ${provider} login:`, error)
    }
  }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-custom p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/30 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gradient-custom">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Social Login Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card 
              onClick={() => handleSocialLogin('google')}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="bg-white p-2 rounded-full shadow-inner">
                    <FaGoogle className="h-6 w-6 text-[var(--color-energy)]" />
                  </div>
                  <h3 className="font-semibold text-sm text-center group-hover:text-[var(--color-energy)] transition-colors">
                    Continuar con Google
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card 
              onClick={() => handleSocialLogin('facebook')}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="bg-white p-2 rounded-full shadow-inner">
                    <FaFacebook className="h-6 w-6 text-[var(--color-warmth)]" />
                  </div>
                  <h3 className="font-semibold text-sm text-center group-hover:text-[var(--color-warmth)] transition-colors">
                    Continuar con Facebook
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--color-comfort)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/30 px-2 text-[var(--color-spice)] font-medium">
                O usa tu email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--color-spice)]">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 h-9 text-sm border-[var(--color-comfort)] focus:border-[var(--color-warmth)] focus:ring-[var(--color-warmth)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--color-spice)]">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 h-9 text-sm border-[var(--color-comfort)] focus:border-[var(--color-warmth)] focus:ring-[var(--color-warmth)]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-gradient-custom text-white h-9 text-sm"
            >
              {isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-[var(--color-spice)] hover:text-[var(--color-energy)]"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

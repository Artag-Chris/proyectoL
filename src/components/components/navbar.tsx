'use client'

import Link from 'next/link'
import { ShoppingCart, User, Flame, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { sendUserDataToBackend } from '@/utils/functions/sendUserLogin'
import useCartStore from '@/utils/store/cartStore'

export function Navbar() {
  const { data: session, status } = useSession()
  const [isAdmin, setIsAdmin] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const checkSession = async () => {
      if (status === 'authenticated') {
        const existe = await sendUserDataToBackend(session!.user)
        if (existe) {
          console.log("existe")
        }
        const email = session!.user?.email
        axios.get(`http://localhost:45623/api/usuarios/cliente/${email}`)
          .then(response => {
            setIsAdmin(response.data.isAdmin)
          })
          .catch(error => {
            console.error('Error fetching user data:', error)
          })
      }
    }
    checkSession()
  }, [status])

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] backdrop-blur-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-[var(--foreground)] flex items-center">
            <Flame className="mr-2 text-[var(--color-primary-dark)]" />
            AromaFlame
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="text-[var(--foreground)]">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[var(--foreground)]">
                    {status === 'authenticated' && session.user?.image ? (
                      <Avatar>
                        <AvatarImage src={session.user.image} alt={session.user.name || ''} />
                        <AvatarFallback>{session.user.name?.charAt(0) || <User className="h-6 w-6" />}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  {status === 'authenticated' ? (
                    <>
                      <DropdownMenuItem onSelect={() => {}} asChild>
                        <Link href="/profile">
                          {session.user?.name || session.user?.email}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onSelect={() => signIn('google')}>
                        Iniciar sesión con Google
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => signIn('facebook')}>
                        Iniciar sesión con Facebook
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
            {status === 'authenticated' && isAdmin && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/admin">
                  <Button variant="ghost" size="icon" className="text-[var(--foreground)]">
                    <Shield className="h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
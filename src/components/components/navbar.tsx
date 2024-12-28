'use client'

import Link from 'next/link'
import { ShoppingCart, User, Flame, LogOut } from 'lucide-react'
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
import { ThemeToggle } from "@/components/components/theme-toggle"

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-[var(--color-comfort)] to-[var(--color-warmth)]/50 backdrop-blur-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-[var(--color-spice)] flex items-center">
            <Flame className="mr-2 text-[var(--color-energy)]" />
            AromaFlame
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-[var(--color-spice)]">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[var(--color-spice)]">
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
                <DropdownMenuContent align="end">
                  {status === 'authenticated' ? (
                    <>
                      <DropdownMenuItem onSelect={() => {}} disabled>
                        {session.user?.name || session.user?.email}
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
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


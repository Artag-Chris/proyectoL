'use client'

import Link from 'next/link'
import { ShoppingCart, User, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-[var(--color-comfort)] to-[var(--color-warmth)]/50 backdrop-blur-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-[var(--color-text)] flex items-center">
            <Flame className="mr-2 text-[var(--color-energy)]" />
            AromaFlame
          </Link>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-[var(--color-text)]">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-[var(--color-text)]">
                <User className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}



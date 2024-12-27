'use client'

import Link from 'next/link'
import { ShoppingCart, User, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-amber-100/80 to-orange-200/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-amber-800 flex items-center">
            <Flame className="mr-2 text-orange-500" />
            AromaFlame
          </Link>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="icon" className="text-amber-800">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="icon" className="text-amber-800">
                <User className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


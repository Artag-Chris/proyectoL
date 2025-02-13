'use client'

import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const FloatingLoginButton = () => {
  const { data: session } = useSession()
  const [isExpanded, setIsExpanded] = useState(false)

  if (session) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50"
      >
        {isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg space-y-2"
          >
            <Button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <FaGoogle />
              Ingresar con Google
            </Button>
            <Button
              onClick={() => signIn('facebook')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <FaFacebook />
              Ingresar con Facebook
            </Button>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="outline"
              className="w-full"
            >
              Cerrar
            </Button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="bg-[var(--color-energy)] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            Inicia sesión fácilmente
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
import { Card } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

function OnlineStatsCard() {
  const onlineUsers = 120

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-[var(--color-text)]/60"
            >
              Usuarios en línea
            </motion.span>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +<CountUp end={onlineUsers} duration={1.8} />
              </span>
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-[var(--color-text)]/60"
            >
              Total de usuarios activos en este momento
            </motion.span>
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 130, delay: 0.3 }}
          >
            <Users className="h-8 w-8 text-[var(--color-text)]" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default OnlineStatsCard
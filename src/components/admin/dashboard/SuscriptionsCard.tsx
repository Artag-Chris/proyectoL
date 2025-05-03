import { Card } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

function SuscriptionsCard() {
  const totalSubscriptions = 2350
  const percentageIncrease = 180.1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]/60">
              suscripciones
            </span>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +<CountUp end={totalSubscriptions} duration={2.5} separator="," />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs text-[var(--color-text)]/60">
                +<CountUp end={percentageIncrease} duration={2.2} decimals={1} />% from last month
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          >
            <Users className="h-8 w-8 text-[var(--color-text)]" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default SuscriptionsCard
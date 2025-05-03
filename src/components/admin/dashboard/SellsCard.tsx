import { Card } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

function SellsCard() {
  const totalSales = 12234
  const percentageIncrease = 15.1

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]/60">
              ventas
            </span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl font-bold text-[var(--color-text)]">
                +<CountUp end={totalSales} duration={2.2} separator="," />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-xs text-[var(--color-text)]/60">
                +<CountUp end={percentageIncrease} duration={1.8} decimals={1} />% from last month
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scale: 0.7, rotate: 15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <ShoppingBag className="h-8 w-8 text-[var(--color-text)]" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default SellsCard
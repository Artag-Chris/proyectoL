import { Card } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

function TotalIncomeCard() {
  const totalIncome = 45231.89
  const percentageIncrease = 20.1

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
              ingresos totales
            </span>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl font-bold text-[var(--color-text)]">
                $<CountUp end={totalIncome} duration={2} separator="," decimals={2} />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs text-[var(--color-text)]/60">
                +<CountUp end={percentageIncrease} duration={2} decimals={1} />% from last month
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <DollarSign className="h-8 w-8 text-[var(--color-text)]" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default TotalIncomeCard
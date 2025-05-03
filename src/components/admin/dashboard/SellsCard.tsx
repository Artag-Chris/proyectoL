import { Card } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import React from 'react'

function SellsCard() {
  return (
    <>
    <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
                ventas
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                {/* aqui vendra una funcion que diga cuantas ventas se han realizado */}
                +12,234
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
              {/* aqui vendra una funcion que diga cuanto en diferencia al mes pasado */}
                +15.1% from last month
                cuanto porcentaje an mentado las ventas
              </span>
            </div>
            <ShoppingBag className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
    </>
  )
}

export default SellsCard
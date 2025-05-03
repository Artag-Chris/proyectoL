import { Card } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import React from 'react'

function TotalIncomeCard() {
    /*
    este componente se encargara de renderizar el total de las ventas y sus porcentajes
    */
  return (
    <>
    <Card className="backdrop-blur-md bg-white/10 border-none">
    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-[var(--color-text)]/60">
         ingresos totales
        </span>
        <span className="text-2xl font-bold text-[var(--color-text)]">
          {/* aqui vendra una funcion que diga cuando ingreso totalmente */}
          $45,231.89
        </span>
        <span className="text-xs text-[var(--color-text)]/60">
        {/* aqui vendra una funcion que diga cuanto en diferencia al mes pasado */}
          +20.1% from last month
        </span>
      </div>
      <DollarSign className="h-8 w-8 text-[var(--color-text)]" />
    </div>
  </Card>
  </>
  )
}

export default TotalIncomeCard
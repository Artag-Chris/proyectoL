import { Card } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'

function SuscriptionsCard() {
    /*
    componente que se encargara de de mostrar el interes en la tienda  
    */
  return (
    <>
    <Card className="backdrop-blur-md bg-white/10 border-none">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]/60">
                suscripciones
              </span>
              <span className="text-2xl font-bold text-[var(--color-text)]">
                {/* aqui vendra una funcion que diga cuantas personas se han suscrito */}
                +2,350
              </span>
              <span className="text-xs text-[var(--color-text)]/60">
              {/* aqui vendra una funcion que diga cuanto en diferencia al mes pasado */}
                +180.1% from last month
              </span>
            </div>
            <Users className="h-8 w-8 text-[var(--color-text)]" />
          </div>
        </Card>
        </>
  )
}

export default SuscriptionsCard
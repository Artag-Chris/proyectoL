import { recentSales } from '@/app/admin/dummy/adminDummy'
import { Card } from '@/components/ui/card'
import React from 'react'
import Image from "next/image";
function RecentSales() {
  return (
    <>
    <Card className="col-span-3 backdrop-blur-md bg-white/10 border-none">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                Ventas recientes
              </h2>
            </div>
            <div className="space-y-8">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={sale.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      {sale.name}
                    </p>
                    <p className="text-sm text-[var(--color-text)]/60">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-[var(--color-text)]">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
    </>
  )
}

export default RecentSales
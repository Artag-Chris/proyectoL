import React from 'react'

function DashboardDate() {
    /*
    Todo: este componente traera la hora y la renderizara  hora actual de navegador
    */
  return (
    <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-[var(--color-text)]">
      Dashboard
    </h1>
    <div className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2 text-[var(--color-text)]">
      Jan 20, 2023 - Feb 09, 2023
    </div>
  </div>
  )
}

export default DashboardDate
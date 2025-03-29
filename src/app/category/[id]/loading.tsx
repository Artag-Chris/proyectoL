import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
      <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
      <p className="text-xl font-medium text-orange-800">Cargando productos...</p>
    </div>
  )
}


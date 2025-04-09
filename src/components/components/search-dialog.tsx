"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Ejemplo de resultados de búsqueda
  const searchResults = [
    { id: 1, name: "Vela aromática de vainilla", price: "$24.99", image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Difusor de bambú", price: "$32.50", image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Set de velas de soja", price: "$45.00", image: "/placeholder.svg?height=80&width=80" },
  ]

  const filteredResults =
    searchQuery.length > 0
      ? searchResults.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : []

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="flex flex-col">
          <div className="flex items-center p-4 border-b">
            <Search className="h-5 w-5 mr-2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 border-none shadow-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 max-h-[60vh] overflow-auto">
            {searchQuery.length > 0 && (
              <AnimatePresence>
                {filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-medium">{result.name}</h4>
                          <p className="text-sm text-muted-foreground">{result.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <p className="text-muted-foreground">No se encontraron resultados para "{searchQuery}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {searchQuery.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Escribe para buscar productos</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface MobileMenuProps {
  isAdmin: boolean
}

export function MobileMenu({ isAdmin }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/products", label: "Productos" },
    { href: "/collections", label: "Colecciones" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ]

  if (isAdmin) {
    menuItems.push({ href: "/admin", label: "Administración" })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Menú</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-auto py-6 px-4">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center py-2 text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} AromaFlame. Todos los derechos reservados.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

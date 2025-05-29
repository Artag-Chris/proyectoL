"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, User, LogIn, LogOut, Home, ShoppingBag, Clock, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MainSidebar() {
  const { data: session } = useSession()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicked */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Toggle button - only visible when sidebar is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 top-20 z-50 md:top-1/2 md:-translate-y-1/2"
          >
            <Button
              onClick={toggleSidebar}
              size="icon"
              className="h-10 w-10 rounded-full bg-orange-500 shadow-lg hover:bg-orange-600 text-white"
              aria-label="Open sidebar"
            >
              <ChevronRight size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "fixed left-0 top-0 h-full w-[280px] z-50 overflow-hidden",
          "bg-white shadow-xl",
          "flex flex-col",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white">
              <Flame size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AromaFlame</h1>
          </div>
          <Button
            onClick={toggleSidebar}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {/* User Profile Section */}
          {session?.user ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="relative w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-semibold text-lg overflow-hidden">
                {session.user.image ? (
                  <Image src={session.user.image || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                ) : (
                  session.user.name?.charAt(0) || "U"
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-sm text-gray-700">Inicia sesión para acceder a tu cuenta</p>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wider">NAVEGACIÓN</h2>
            <nav className="space-y-1.5">
              <NavItem href="/" icon={Home}>
                Inicio
              </NavItem>
              <NavItem href="/products" icon={ShoppingBag}>
                Productos
              </NavItem>
              <NavItem href="/recent" icon={Clock}>
                Vistos recientemente
              </NavItem>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wider">CATEGORÍAS</h2>
            <nav className="space-y-1.5">
              <CategoryItem href="/category/figuras" color="bg-orange-100" textColor="text-orange-600">
                Figuras
              </CategoryItem>
              <CategoryItem href="/category/lamparas" color="bg-blue-100" textColor="text-blue-600">
                Lámparas
              </CategoryItem>
              <CategoryItem href="/category/mousepad" color="bg-green-100" textColor="text-green-600">
                Mouse Pad
              </CategoryItem>
              <CategoryItem href="/category/cuadros" color="bg-purple-100" textColor="text-purple-600">
                Cuadros
              </CategoryItem>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 space-y-1.5 bg-gray-50">
          <NavItem href="/profile" icon={User}>
            Mi Perfil
          </NavItem>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-normal h-9 px-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            {session ? (
              <>
                <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </>
  )
}

// Helper component for navigation items
function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center h-10 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <Icon className="mr-3 h-5 w-5 text-gray-500" />
      <span className="font-medium">{children}</span>
    </Link>
  )
}

// Helper component for category items with colored icons
function CategoryItem({
  href,
  color,
  textColor,
  children,
}: {
  href: string
  color: string
  textColor: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center h-10 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <div className={`flex items-center justify-center w-7 h-7 rounded-md ${color} ${textColor} mr-3`}>
        <ShoppingBag className="h-4 w-4" />
      </div>
      <span className="font-medium">{children}</span>
    </Link>
  )
}

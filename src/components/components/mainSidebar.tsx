"use client"

import type React from "react"

import { useState } from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, User, LogIn, LogOut, Home, ShoppingBag, Settings, Clock } from "lucide-react"
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
              className="h-10 w-10 rounded-full bg-primary/80 backdrop-blur-md shadow-lg hover:bg-primary/90 text-primary-foreground"
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
          "bg-background/60 backdrop-blur-xl border-r shadow-xl",
          "flex flex-col",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Company Logo" width={40} height={40} className="rounded-md" />
            <h1 className="text-xl font-bold">My Company</h1>
          </div>
          <Button
            onClick={toggleSidebar}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-muted"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* User Profile Section */}
          {session?.user?.image && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Image
                src={session.user.image || "/placeholder.svg"}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">NAVIGATION</h2>
            <nav className="space-y-1">
              <NavItem href="/" icon={Home}>
                Home
              </NavItem>
              <NavItem href="/products" icon={ShoppingBag}>
                Products
              </NavItem>
              <NavItem href="/recent" icon={Clock}>
                Recent Items
              </NavItem>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">CATEGORIES</h2>
            <nav className="space-y-1">
              <NavItem href="/category/electronics" icon={ShoppingBag}>
                Electronics
              </NavItem>
              <NavItem href="/category/clothing" icon={ShoppingBag}>
                Clothing
              </NavItem>
              <NavItem href="/category/home" icon={ShoppingBag}>
                Home & Garden
              </NavItem>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-1">
          <NavItem href="/profile" icon={User}>
            My Profile
          </NavItem>
          <NavItem href="/settings" icon={Settings}>
            Settings
          </NavItem>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal h-9 px-2">
            {session ? (
              <>
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Log In
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
    <Link href={href} className="flex items-center h-9 px-2 rounded-md text-sm hover:bg-muted transition-colors">
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Link>
  )
}


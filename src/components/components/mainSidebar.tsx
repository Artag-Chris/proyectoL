"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, User, LogIn, LogOut, Home, ShoppingBag, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Image from "next/image"

const MainSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 100 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 100 } },
  }

  const buttonVariants = {
    open: { opacity: 0, x: -50, transition: { duration: 0.2 } },
    closed: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial="closed"
            animate="closed"
            exit="open"
            variants={buttonVariants}
            className="main-sidebar-toggle-container fixed left-4 top-1/2 -translate-y-1/2 z-20"
          >
            <Button
              onClick={toggleSidebar}
              className="main-sidebar-toggle-button rounded-full p-3 bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white"
            >
              <ChevronRight size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="main-sidebar fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md text-black p-5 shadow-lg z-10 overflow-y-auto"
      >
        <Button
          onClick={toggleSidebar}
          className="main-sidebar-close-button absolute top-4 right-4 rounded-full p-2 bg-black/20 hover:bg-black/30 text-white"
        >
          <ChevronLeft size={24} />
        </Button>

        <div className="main-sidebar-content flex flex-col h-full">
          {/* Header */}
          <div className="main-sidebar-header mb-8 text-center">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={64}
              height={64}
              className="main-sidebar-logo mx-auto mb-2"
            />
            <h1 className="main-sidebar-title text-xl font-bold">My Company</h1>
          </div>

          {/* Body */}
          <div className="main-sidebar-body flex-grow">
            {session?.user?.image && (
              <div className="main-sidebar-profile mb-6 text-center">
                <Image
                  src={session.user.image || "/placeholder.svg"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="main-sidebar-profile-image mx-auto rounded-full"
                />
                <p className="main-sidebar-profile-name mt-2 font-semibold">{session.user.name}</p>
              </div>
            )}

            <nav className="main-sidebar-nav space-y-6">
              <div className="main-sidebar-categories">
                <h2 className="main-sidebar-section-title text-lg font-bold mb-2">Categories</h2>
                <ul className="main-sidebar-category-list space-y-2">
                  <li>
                    <Button variant="ghost" className="main-sidebar-category-item w-full justify-start">
                      <Home className="mr-2" size={18} /> Home
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="main-sidebar-category-item w-full justify-start">
                      <ShoppingBag className="mr-2" size={18} /> Products
                    </Button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="main-sidebar-footer mt-auto">
            <h2 className="main-sidebar-section-title text-lg font-bold mb-2">Profile</h2>
            <ul className="main-sidebar-profile-list space-y-2">
              <li>
                <Button variant="ghost" className="main-sidebar-profile-item w-full justify-start">
                  <User className="mr-2" size={18} /> My Profile
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="main-sidebar-profile-item w-full justify-start">
                  <Settings className="mr-2" size={18} /> Settings
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="main-sidebar-profile-item w-full justify-start">
                  {session ? (
                    <>
                      <LogOut className="mr-2" size={18} /> Log Out
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2" size={18} /> Log In
                    </>
                  )}
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default MainSidebar


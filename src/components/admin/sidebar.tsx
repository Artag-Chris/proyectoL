'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Package, ShoppingCart, Users, FolderPlus, PlusCircle } from 'lucide-react'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    color: "text-sky-500",
  },
  {
    label: 'Productos',
    icon: Package,
    href: '/admin/products',
    color: "text-violet-500",
  },
  {
    label: 'Crear Producto',
    icon: PlusCircle,
    href: '/admin/add-product',
    color: "text-pink-700",
  },
  {
    label: 'Categorías',
    icon: FolderPlus,
    href: '/admin/categories',
    color: "text-orange-700",
  },
  {
    label: 'Pedidos',
    icon: ShoppingCart,
    href: '/admin/orders',
    color: "text-green-700",
  },
  {
    label: 'Usuarios',
    icon: Users,
    href: '/admin/users',
    color: "text-blue-700",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full backdrop-blur-md bg-white/10 border-r border-white/10">
      <div className="px-3 py-2">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Admin Panel
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "bg-white/10" : "transparent",
                "text-[var(--color-text)]"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
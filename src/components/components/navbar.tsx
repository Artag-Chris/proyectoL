import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">VibrantShop</Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  )
}


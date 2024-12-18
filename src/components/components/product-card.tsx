import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden h-full backdrop-blur-md bg-white/30 border-none shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-md"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xl font-bold">${price.toFixed(2)}</span>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}


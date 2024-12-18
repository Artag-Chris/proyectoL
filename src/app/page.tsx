import { Categories } from "../components/components/categories"
import { Navbar } from "../components/components/navbar"
import { ProductCard } from "../components/components/product-card"
import { ProductCarousel } from "../components/components/product-carousel"


const products = [
  { 
    id: 1, 
    name: 'Vela Aromática Lavanda', 
    price: 19.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática de lavanda hecha a mano con cera de soja natural y aceites esenciales.'
  },
  { 
    id: 2, 
    name: 'Smartphone XYZ', 
    price: 599.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Un smartphone de última generación con cámara de alta resolución y batería de larga duración.'
  },
  { 
    id: 3, 
    name: 'Set de Velas Decorativas', 
    price: 34.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 3 velas decorativas con diferentes formas y tamaños, perfectas para crear ambiente.'
  },
  { 
    id: 4, 
    name: 'Smartwatch Pro', 
    price: 249.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Reloj inteligente con monitoreo de salud, notificaciones y resistencia al agua.'
  },
]

const soldProducts = [
  { 
    id: 5, 
    name: 'Vela de Soja Vainilla', 
    price: 24.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela de soja con aroma a vainilla, larga duración y envase reutilizable.'
  },
  { 
    id: 6, 
    name: 'Consola de Juegos', 
    price: 499.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'La última consola de juegos con gráficos de alta calidad y juegos exclusivos.'
  },
  { 
    id: 7, 
    name: 'Vela Aromática Cítrica', 
    price: 22.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con fragancia cítrica refrescante, ideal para energizar espacios.'
  },
]

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 to-yellow-200">
      <Navbar />
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl font-bold text-center my-8 text-white">Bienvenido a VibrantShop</h1>
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-white">Categorías</h2>
        <Categories />
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-white">Últimos productos vendidos</h2>
        <ProductCarousel products={soldProducts} />
        
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-white">Lo último en llegar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
            />
          ))}
        </div>
      </div>
    </main>
  )
}


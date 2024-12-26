'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Navbar } from '@/components/components/navbar'
import { Footer } from '@/components/components/footer'
import { ProductCard } from '@/components/components/product-card'

// Datos dummy para la demostración
const categoryProducts = [
  { 
    id: 1, 
    name: 'Vela Aromática Lavanda', 
    price: 19.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática de lavanda hecha a mano con cera de soja natural y aceites esenciales.'
  },
  { 
    id: 2, 
    name: 'Set de Velas Decorativas', 
    price: 34.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 3 velas decorativas con diferentes formas y tamaños, perfectas para crear ambiente.'
  },
  { 
    id: 3, 
    name: 'Vela de Soja Vainilla', 
    price: 24.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela de soja con aroma a vainilla, larga duración y envase reutilizable.'
  },
  { 
    id: 4, 
    name: 'Vela Aromática Cítrica', 
    price: 22.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela aromática con fragancia cítrica refrescante, ideal para energizar espacios.'
  },
  { 
    id: 5, 
    name: 'Vela de Cera de Abeja', 
    price: 27.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Vela natural de cera de abeja, con aroma suave y propiedades purificantes del aire.'
  },
  { 
    id: 6, 
    name: 'Set de Mini Velas de Té', 
    price: 15.99, 
    image: '/placeholder.svg?height=200&width=200',
    description: 'Set de 20 mini velas de té, perfectas para crear un ambiente romántico o relajante.'
  },
]

export default function CategoryPage() {
  const params = useParams()
  const [sortBy, setSortBy] = useState('name')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 to-yellow-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center my-8 text-white">
          Categoría: {params.slug}
        </h1>
        
        <div className="backdrop-blur-md bg-white/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2"
            />
            <div className="flex items-center gap-2">
              <span className="text-white">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
            />
          ))}
        </div>
        
        {sortedProducts.length === 0 && (
          <p className="text-center text-white text-xl mt-8">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}


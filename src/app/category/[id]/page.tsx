'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PageTransition from '@/components/transitions/PageTransition'
import { FadeInTransition } from '@/components/transitions/FadeIn'
import useGetCategoryProducts from '@/hooks/useGetCategoryProducts'

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = id ? id.toString() : '';
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId) {
      setLoadingMessage(`Cargando: ${categoryId}`);
      const timer = setTimeout(() => {
        setLoadingMessage(null);
      }, 2000); // Tiempo mínimo de espera de 2 segundos

      return () => clearTimeout(timer);
    }
  }, [categoryId]);

  const { products, loading, error } = useGetCategoryProducts(categoryId);

  if (loading || loadingMessage) {
    return <div>{loadingMessage || 'Loading...'}</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!products || products.length === 0) {
    return <div>No products found for this category.</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-200 p-4">
      <PageTransition />
      <FadeInTransition position="right">
        <Card className="w-full max-w-2xl backdrop-blur-md bg-white/30 border-none shadow-lg">
          <CardHeader>
            <CardTitle>Productos de la Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow-md">
                  <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="text-lg font-semibold">${product.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeInTransition>
    </div>
  )
}
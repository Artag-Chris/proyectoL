import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TabsContent } from '@radix-ui/react-tabs'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

function ShoppingCartsView() {
  return (
    <>
    <TabsContent value="shopping-carts" className="mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Carritos de Compra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Monitoreo de Carritos</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Esta sección mostrará información sobre los carritos de compra activos de tus clientes,
                    permitiéndote analizar comportamientos de compra y productos abandonados.
                  </p>
                  <Button variant="outline" disabled>
                    Próximamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
    </>
  )
}

export default ShoppingCartsView
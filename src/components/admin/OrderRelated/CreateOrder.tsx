import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TabsContent } from '@radix-ui/react-tabs'
import { PlusCircle, ShoppingBag } from 'lucide-react'
import React from 'react'

function CreateOrder() {
  return (
    <>
    <TabsContent value="create-order" className="mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Crear Nuevo Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Funcionalidad en desarrollo</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Esta sección para crear nuevos pedidos estará disponible próximamente. Aquí podrás seleccionar
                    productos, asignar clientes y generar nuevos pedidos.
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

export default CreateOrder
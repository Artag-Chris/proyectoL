import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { TabsContent } from '@radix-ui/react-tabs'
import { Edit } from 'lucide-react'
import React from 'react'

function ModifyOrder() {
  return (
   <>
         <TabsContent value="modify-order" className="mt-0">
            <Card className="backdrop-blur-md bg-white/80 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Edit className="h-5 w-5 text-primary" />
                  Modificar Pedido Existente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Buscar Pedido por ID</label>
                      <div className="flex gap-2">
                        <Input placeholder="Ej: 1001" className="flex-1" />
                        <Button variant="secondary">Buscar</Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Filtrar por Cliente</label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Cliente 1</SelectItem>
                          <SelectItem value="2">Cliente 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Edit className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Selecciona un pedido para modificar</h3>
                    <p className="text-muted-foreground max-w-md">
                      Busca un pedido por su ID o filtra por cliente para comenzar a editar sus detalles, cambiar su
                      estado o actualizar los productos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
   </>
  )
}

export default ModifyOrder
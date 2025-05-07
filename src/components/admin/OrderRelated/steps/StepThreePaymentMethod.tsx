import React from 'react'
import { CreditCard, Truck, User, ShoppingBag } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'


interface StepThreePaymentMethodProps {
  selectedUser: any| null
  selectedProducts: any[]
  paymentMethod: string
  orderStatus: string
  calculateOrderTotal: () => number
  setPaymentMethod: (value: string) => void
  setOrderStatus: (value: string) => void
}

function StepThreePaymentMethod({
  selectedUser,
  selectedProducts,
  paymentMethod,
  orderStatus,
  calculateOrderTotal,
  setPaymentMethod,
  setOrderStatus
}: StepThreePaymentMethodProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          Finalizar Pedido
        </h2>

        {/* Resumen del pedido */}
        <div className="bg-muted/30 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-3">Resumen del pedido</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Cliente:</span>
              <span>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <ShoppingBag className="h-4 w-4 text-primary mt-1" />
              <div>
                <span className="font-medium">Productos:</span>
                <ul className="mt-1 space-y-1 text-sm">
                  {selectedProducts.map((product) => (
                    <li key={product.id} className="flex justify-between">
                      <span>
                        {product.name} x {product.quantity}
                      </span>
                      <span>
                        $
                        {(
                          (product.discount
                            ? product.price - (product.price * product.discount) / 100
                            : product.price) * product.quantity
                        ).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between pt-2 border-t">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${calculateOrderTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Método de pago y estado */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Método de pago */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              Método de pago
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Selecciona un método de pago" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5}>
                <SelectItem value="credit_card">Tarjeta de crédito</SelectItem>
                <SelectItem value="debit_card">Tarjeta de débito</SelectItem>
                <SelectItem value="cash">Efectivo</SelectItem>
                <SelectItem value="transfer">Transferencia bancaria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estado del pedido */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Estado del pedido
            </label>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5}>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="processing">En proceso</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepThreePaymentMethod
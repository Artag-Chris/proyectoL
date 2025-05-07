import React from 'react'
import { User, Search, Loader2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectableUserCard } from '../SelectedUserForOrder'




interface StepOneUserProps {
  searchUserTerm: string
  loading: boolean
  filteredUsers: any[]
  selectedUser: any | null
  onSearchChange: (value: string) => void
  onSelectUser: (user: any) => void
  onResetSearch?: () => void
}

function StepOneUser({
  searchUserTerm,
  loading,
  filteredUsers,
  selectedUser,
  onSearchChange,
  onSelectUser,
  onResetSearch
}: StepOneUserProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-primary" />
          Seleccionar Cliente
        </h2>

        {/* Buscador de usuarios */}
        <div className="relative max-w-md w-full mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchUserTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-white/50"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-lg font-medium text-[var(--color-text)]">Cargando clientes...</p>
            </div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <SelectableUserCard
                key={user.id}
                user={user as any}
                isSelected={selectedUser?.id === user.id}
                onSelect={() => onSelectUser(user)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {searchUserTerm
                ? `No se encontraron clientes que coincidan con "${searchUserTerm}"`
                : "No hay clientes disponibles"}
            </p>
            {searchUserTerm && onResetSearch && (
              <Button variant="outline" className="mt-4" onClick={onResetSearch}>
                Mostrar todos los clientes
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StepOneUser
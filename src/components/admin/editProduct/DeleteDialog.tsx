import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { AlertCircle, Trash2 } from 'lucide-react'
  
  interface DeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onDelete: (productId: number) => void
    productId: number
  }
  
  function DeleteDialog({ open, onOpenChange, onDelete, productId }: DeleteDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">¿Eliminar producto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center p-4 border rounded-lg bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">Se eliminarán todas las imágenes y datos asociados a este producto.</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(productId)
                onOpenChange(false)
              }} 
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Producto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default DeleteDialog
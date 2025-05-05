import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  interface UndoneChangesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
  }
  
  function UndoneChangesDialog({ open, onOpenChange, onConfirm }: UndoneChangesDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Descartar cambios?</DialogTitle>
            <DialogDescription>
              Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Seguir editando
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onConfirm()
                onOpenChange(false)
              }}
            >
              Descartar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default UndoneChangesDialog
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, Save, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import React from 'react'

interface HeaderEditProps {
  parsedId: string | number;
  handleCancel: (hasChanges: boolean, setShowDiscardDialog: (show: boolean) => void) => void;
  handleSave: () => void;
  handleDelete: () => void;
  setShowDeleteDialog: (show: boolean) => void;
  setShowDiscardDialog: (show: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setErrors: (errors: any) => void;
  setHasChanges: (hasChanges: boolean) => void;
  formData: any;
  images: any[];
  isSaving: boolean;
  hasChanges: boolean;
}

function HeaderEdit({
  parsedId,
  handleCancel,
  handleSave,
  handleDelete,
  setShowDeleteDialog,
  setShowDiscardDialog,
  setIsSaving,
  setErrors,
  setHasChanges,
  formData,
  images,
  isSaving,
  hasChanges
}: HeaderEditProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleCancel(hasChanges, setShowDiscardDialog)} 
          className="h-10 w-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Editar Producto</h1>
        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
          ID: {parsedId}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleCancel(hasChanges, setShowDiscardDialog)} 
          className="gap-2"
        >
          Cancelar
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => setShowDeleteDialog(true)} 
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !hasChanges} 
          className="gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default HeaderEdit
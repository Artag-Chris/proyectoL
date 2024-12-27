import { Button } from '@/components/ui/button'

const categories = [
  'Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Belleza'
]

//aqui usaremos el hook de traer las categorias de la base de datos para renderizarlos
//een el componente de categorias

export function Categories() {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {categories.map((category) => (
        <Button key={category} variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          {category}
        </Button>
      ))}
    </div>
  )
}


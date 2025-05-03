"use client"
import { monthlyData } from "@/app/admin/dummy/adminDummy"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

function GraphMetricCard() {
  /*
   * Componente que se encarga de renderizar gráficas de métricas
   *
   * ESTRUCTURA DE DATOS REQUERIDA:
   * Para usar este componente con datos reales, necesitas un array de objetos con esta estructura:
   * [
   *   { month: "Ene", revenue: 1000, users: 500 },
   *   { month: "Feb", revenue: 1500, users: 700 },
   *   ...
   * ]
   *
   * IMPLEMENTACIÓN CON DATOS REALES:
   * 1. Crear un estado para almacenar los datos y un estado de carga:
   *    const [data, setData] = useState([])
   *    const [isLoading, setIsLoading] = useState(true)
   *
   * 2. Hacer la petición a tu API:
   *    useEffect(() => {
   *      async function fetchData() {
   *        setIsLoading(true)
   *        try {
   *          const response = await fetch('/api/metrics')
   *          const result = await response.json()
   *
   *          // Formatear los datos si es necesario
   *          const formattedData = result.data.map(item => ({
   *            month: item.period,
   *            revenue: item.sales,
   *            users: item.newUsers
   *          }))
   *
   *          setData(formattedData)
   *        } catch (error) {
   *          console.error('Error al cargar los datos:', error)
   *        } finally {
   *          setIsLoading(false)
   *        }
   *      }
   *
   *      fetchData()
   *    }, [])
   *
   * 3. Renderizar un estado de carga o la gráfica según corresponda
   */

  // Datos de ejemplo con múltiples series para hacer la gráfica más interesante
  const enhancedData = monthlyData.map((item) => ({
    ...item,
    users: Math.floor(item.revenue * 0.7), // Simulamos una segunda serie de datos
  }))

  return (
    <Card className="col-span-4 backdrop-blur-md bg-white/10 border-none">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--color-text)]">Métricas Mensuales</h2>
          <div className="text-sm text-muted-foreground">Último año fiscal</div>
        </div>

        {/* Usamos ResponsiveContainer para asegurar que la gráfica se ajuste al contenedor */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              config={{
                revenue: {
                  label: "Ingresos",
                  color: "hsl(var(--chart-1))",
                },
                users: {
                  label: "Usuarios",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <BarChart
                data={enhancedData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 20,
                }}
                barGap={4}
                barCategoryGap={16}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  width={50}
                />
                <ChartTooltip cursor={{ fill: "rgba(200, 200, 200, 0.1)" }} content={<ChartTooltipContent />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />
                <Bar
                  dataKey="revenue"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary/80"
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Bar
                  dataKey="users"
                  radius={[4, 4, 0, 0]}
                  className="fill-secondary/80"
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={300}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

export default GraphMetricCard

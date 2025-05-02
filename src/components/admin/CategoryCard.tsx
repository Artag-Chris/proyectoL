import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function CategoryCard({ category }: any) {
    return (
      <Card className="backdrop-blur-md bg-white/10 border-none">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--color-text)]">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--color-text)]/80 mb-2">
            {category.description}
          </p>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                category.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-[var(--color-text)]/80">
              {category.isAvailable ? "Disponible" : "No Disponible"}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }
  
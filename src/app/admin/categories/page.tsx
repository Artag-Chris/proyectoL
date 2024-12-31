"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PageTransition from "@/components/transitions/PageTransition";

// Datos dummy para categorías
const initialCategories = [
  {
    id: 1,
    name: "Velas Aromáticas",
    description: "Velas con fragancias naturales",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Difusores",
    description: "Difusores de aceites esenciales",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Accesorios",
    description: "Accesorios para velas y aromaterapia",
    isAvailable: false,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isAvailable: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCategories([
      ...categories,
      { ...newCategory, id: categories.length + 1 },
    ]);
    setNewCategory({ name: "", description: "", isAvailable: true });
  };

  return (
    <div className="space-y-10">
      <PageTransition />
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        Categorías
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <Card className="backdrop-blur-md bg-white/10 border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[var(--color-text)]">
            Crear Nueva Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[var(--color-text)]">
                Nombre
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                required
                className="bg-white/20 text-[var(--color-text)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[var(--color-text)]">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="bg-white/20 text-[var(--color-text)]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isAvailable"
                checked={newCategory.isAvailable}
                onCheckedChange={(checked) =>
                  setNewCategory({ ...newCategory, isAvailable: checked })
                }
              />
              <Label htmlFor="isAvailable" className="text-[var(--color-text)]">
                Disponible
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Crear Categoría
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryCard({ category }: any) {
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

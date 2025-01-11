"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PageTransition from "@/components/transitions/PageTransition";
import useGetCategories from "@/hooks/useGetCategory";

export default function CategoriesPage() {
  const { data: { categories = [] } = {}, loading, error } = useGetCategories();
  const [addCategory, setAddCategory] = useState(categories);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isAvailable: true,
  });

  useEffect(() => {
    // Actualizar addCategory cuando categories cambie
    setAddCategory(categories);
  }, [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddCategory([
      ...addCategory,
      { ...newCategory, id: addCategory.length + 1 },
    ]);
    setNewCategory({ name: "", description: "", isAvailable: true });
    const sendData = async () => {
      try {
        const response = await fetch("http://localhost:45623/api/productos/createcategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    sendData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-10">
      <PageTransition />
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        Categorías
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addCategory.map((category) => (
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

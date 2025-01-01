"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import PageTransition from "@/components/transitions/PageTransition";
import { FadeInTransition } from "@/components/transitions/FadeIn";

// Datos dummy para productos
const products = [
  {
    id: 1,
    name: "Vela Aromática Lavanda",
    price: 19.99,
    image: "/placeholder.svg",
    available: true,
  },
  {
    id: 2,
    name: "Difusor de Aceites",
    price: 29.99,
    image: "/placeholder.svg",
    available: true,
  },
  {
    id: 3,
    name: "Set de Velas de Soja",
    price: 24.99,
    image: "/placeholder.svg",
    available: false,
  },
  {
    id: 4,
    name: "Vela de Masaje",
    price: 34.99,
    image: "/placeholder.svg",
    available: true,
  },
  {
    id: 5,
    name: "Vela en Tarro de Cristal",
    price: 14.99,
    image: "/placeholder.svg",
    available: false,
  },
  {
    id: 6,
    name: "Pack de Velas Tea Light",
    price: 9.99,
    image: "/placeholder.svg",
    available: true,
  },
];

export default function ProductsPage() {
  const availableProducts = products.filter((product) => product.available);
  const unavailableProducts = products.filter((product) => !product.available);

  return (
    <div className="space-y-10">
      <PageTransition />
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Productos</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
          Productos Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProducts.map((product) => (
            <FadeInTransition position="right">
            <ProductCard key={product.id} product={product} />
            </FadeInTransition>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
          Productos No Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unavailableProducts.map((product) => (
             <FadeInTransition position="bottom">
            <ProductCard key={product.id} product={product} />
            </FadeInTransition>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: any) {
  return (
    <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-[var(--color-text)]">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[var(--color-text)]/80">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant={product.available ? "default" : "destructive"}>
          {product.available ? "Disponible" : "No Disponible"}
        </Badge>
      </CardFooter>
    </Card>
  );
}

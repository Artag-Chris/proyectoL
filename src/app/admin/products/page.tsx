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
import { motion } from "framer-motion";
import useGetAllProducts from "@/hooks/useGetAllProducts";


export default function ProductsPage() {
  const { data, loading, error } = useGetAllProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const availableProducts = data.product.filter((product) => product.isAvailable);
  const unavailableProducts = data.product.filter((product) => !product.isAvailable);

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
            <FadeInTransition position="right" key={product.id}>
              <ProductCard product={product} />
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
            <FadeInTransition position="bottom" key={product.id}>
              <ProductCard product={product} />
            </FadeInTransition>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
        <div className="relative h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg text-[var(--color-text)]">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--color-text)]/80">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
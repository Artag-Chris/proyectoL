"use client";

import PageTransition from "@/components/transitions/PageTransition";
import { FadeInTransition } from "@/components/transitions/FadeIn";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import { Product, ProductCardAdmin } from "@/components/admin/ProductCardAdmin";


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
              <ProductCardAdmin product={product} />
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
              <ProductCardAdmin product={product} />
            </FadeInTransition>
          ))}
        </div>
      </div>
    </div>
  );
}


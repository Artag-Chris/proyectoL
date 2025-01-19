import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./product-card";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface BentoSectionProps {
  soldProducts: Product[];
  containerVariants: any;
}

export function BentoSection({ soldProducts, containerVariants }: BentoSectionProps) {
  const [products, setProducts] = useState(soldProducts);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setProducts(shuffled);
    }, 5000); // Cambia los elementos cada 5 segundos

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {products.slice(0, 10).map((product, index) => (
            <motion.div
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={product.id}
              className={`
                backdrop-blur-md bg-white/30 rounded-lg overflow-hidden shadow-lg border-4 border-black
                ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                ${index === 1 ? "md:col-span-2" : ""}
                ${index === 3 ? "md:row-span-2" : ""}
                ${index === 5 ? "md:col-span-2" : ""}
              `}
              style={{ height: '100%' }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
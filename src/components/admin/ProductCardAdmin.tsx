import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Image from "next/image";

export function ProductCardAdmin({ product }: any) {
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
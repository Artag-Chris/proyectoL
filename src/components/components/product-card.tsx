import { motion } from "framer-motion";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/utils/store/cartStore";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export function ProductCard({ id, name, price, imageUrl, description }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, quantity: 1, price, imageUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", stiffness: 260, damping: 20 },
      }}
      className="w-full h-full"
    >
      <Card className="w-full h-full flex flex-col justify-between overflow-hidden border-none bg-transparent relative">
        <Link href={`/product/${id}`} passHref>
          <div className="relative w-full h-72 md:h-96 lg:h-[30rem]">
            <Image
              src={imageUrl}
              alt={name}
              fill
              style={{ objectFit: "cover" }}
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-center items-center p-4 z-10"
            >
              <CardTitle className="text-2xl font-semibold text-white mb-2">
                {name}
              </CardTitle>
              <p className="text-lg text-white/80 text-center">{description}</p>
            </motion.div>
          </div>
        </Link>
        {/* <CardFooter className="flex justify-between items-center p-4 bg-white/30 backdrop-blur-md mt-auto">
          <span className="text-xl font-bold text-white">${price}</span>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            Añadir al carrito
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
}
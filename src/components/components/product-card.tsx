import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  description,
}: ProductCardProps) {
  //console.log(id, name, price, imageUrl)
  //aqui se podria colocar  las animaciones de framer motion para que se vea mas fluido
  //Todo agregar las images para que funcione el link
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full h-full"
     
    >
      
      <Card className="w-full h-full flex flex-col justify-between overflow-hidden border-none bg-transparent">
        <div className="relative flex-grow">
        <Link href={`/product/${id}`}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            />
           </Link>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4"
            >

            <CardTitle className="text-lg font-semibold text-white mb-2">
              {name}
            </CardTitle>
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          </motion.div>
        </div>
        <CardFooter className="flex justify-between items-center p-4 bg-white/30 backdrop-blur-md">
          <span className="text-xl font-bold text-white">
            ${price}
          </span>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Añadir al carrito
          </Button>
        </CardFooter>
      </Card>
      
    </motion.div>
  );
}

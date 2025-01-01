import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FadeInTransition } from "../transitions/FadeIn";

const categories = ["Electrónicos", "Ropa", "Hogar", "Deportes", "Belleza"];

//aqui usaremos el hook de traer las categorias de la base de datos para renderizarlos
//een el componente de categorias

export function Categories() {
  return (
    <FadeInTransition position="bottom">
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {categories.map((category) => (
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--color-secondary/80)",
            }}
            whileTap={{ scale: 0.95 }}
            key={category}
            className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-lg"
          >
            {category}
          </motion.button>
        ))}
      </div>
    </FadeInTransition>
  );
}

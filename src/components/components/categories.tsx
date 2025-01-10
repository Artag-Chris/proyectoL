import { motion } from "framer-motion";
import { FadeInTransition } from "../transitions/FadeIn";
import Link from "next/link";
import useGetCategories from "@/hooks/useGetCategory";


//aqui usaremos el hook de traer las categorias de la base de datos para renderizarlos
//een el componente de categorias

export function Categories() {
  const { data:{categories}, loading, error } = useGetCategories();
  return (
    <FadeInTransition position="bottom">
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {categories.map((category) => (
          <Link href={`/category/${category.name}`} key={category.name}>
            <motion.button
              whileHover={{
                scale: 1.05,
            //    backgroundColor: "var(--color-secondary/80)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-lg"
            >
              {category.name}
            </motion.button>
          </Link>
        ))}
      </div>
    </FadeInTransition>
  );
}

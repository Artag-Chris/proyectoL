import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FadeInTransition } from "../transitions/FadeIn";
import Link from "next/link";
import useGetCategories, { Category } from "@/hooks/useGetCategory";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, loading, error } = useGetCategories();

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategories(data.categories);
      localStorage.setItem('categories', JSON.stringify(data.categories));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FadeInTransition position="bottom">
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {Array.isArray(categories) && categories.map((category) => (
          <Link href={`/category/${category.name}`} key={category.id}>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-lg border-2 border-black"
            >
              {category.name}
            </motion.button>
          </Link>
        ))}
      </div>
    </FadeInTransition>
  );
}
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FadeInTransition } from "../transitions/FadeIn";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useGetCategories, { Category } from "@/hooks/useGetCategory";
import { useCategoryStore } from '@/utils/store/categoryStore';

const CATEGORIES_TO_SHOW = 6;

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const { data, loading, error } = useGetCategories();
  const { selectedCategoryId, setSelectedCategory } = useCategoryStore();
  
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    if (data?.categories?.length > 0) {
      setCategories(data.categories);
      localStorage.setItem('categories', JSON.stringify(data.categories));
    }
  }, [data]);

  const visibleCategories = categories.slice(startIndex, startIndex + CATEGORIES_TO_SHOW);
  const hasMoreLeft = startIndex > 0;
  const hasMoreRight = startIndex + CATEGORIES_TO_SHOW < categories.length;

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - CATEGORIES_TO_SHOW));
  };

  const handleNext = () => {
    setStartIndex(Math.min(startIndex + CATEGORIES_TO_SHOW, categories.length - CATEGORIES_TO_SHOW));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FadeInTransition position="bottom">
      <div className="relative max-w-4xl mx-auto px-8">
        {hasMoreLeft && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {Array.isArray(visibleCategories) && visibleCategories.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg border-2 transition-colors duration-300 ${
                  selectedCategoryId === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary text-secondary-foreground border-black'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </motion.button>
            </Link>
          ))}
        </div>

        {hasMoreRight && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </FadeInTransition>
  );
}
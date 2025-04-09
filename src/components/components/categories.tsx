"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FadeInTransition } from "../transitions/FadeIn"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Flame, Leaf, Wind, Droplets, Package, Star, Coffee, Gift } from "lucide-react"
import useGetCategories, { type Category } from "@/hooks/useGetCategory"
import { useCategoryStore } from "@/utils/store/categoryStore"

const CATEGORIES_TO_SHOW = 4

// Iconos predeterminados para categorías (se usarán si no hay iconos en los datos)
const defaultIcons = [Flame, Wind, Leaf, Droplets, Package, Star, Coffee, Gift]
const defaultColors = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-amber-100 text-amber-600",
  "bg-teal-100 text-teal-600",
  "bg-rose-100 text-rose-600",
]

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const { data, loading, error } = useGetCategories()
  const { selectedCategoryId, setSelectedCategory } = useCategoryStore()

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories")
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }
  }, [])

  useEffect(() => {
    if (data?.categories?.length > 0) {
      setCategories(data.categories)
      localStorage.setItem("categories", JSON.stringify(data.categories))
    }
  }, [data])

  const visibleCategories = categories.slice(startIndex, startIndex + CATEGORIES_TO_SHOW)
  const hasMoreLeft = startIndex > 0
  const hasMoreRight = startIndex + CATEGORIES_TO_SHOW < categories.length

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - CATEGORIES_TO_SHOW))
  }

  const handleNext = () => {
    setStartIndex(Math.min(startIndex + CATEGORIES_TO_SHOW, categories.length - CATEGORIES_TO_SHOW))
  }

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        <p>Error al cargar categorías: {error}</p>
      </div>
    )
  }

  return (
    <FadeInTransition position="bottom">
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">Categorías</h2>
          <Link
            href="/categories"
            className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            Ver todas →
          </Link>
        </div>

        <div className="relative">
          {hasMoreLeft && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
              aria-label="Categorías anteriores"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
            {Array.isArray(visibleCategories) &&
              visibleCategories.map((category, index) => {
                // Usar un índice para seleccionar un icono y color predeterminado
                const IconComponent = defaultIcons[index % defaultIcons.length]
                const colorClass = defaultColors[index % defaultColors.length]

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div
                      className={`group relative overflow-hidden rounded-lg border p-5 hover:shadow-md transition-all duration-300 h-full cursor-pointer ${
                        selectedCategoryId === category.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-white"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full ${colorClass} opacity-20 group-hover:opacity-30 transition-opacity`}
                      />

                      <div className="flex flex-col h-full">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClass} mb-4`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>

                        <h3 className="text-lg font-medium mb-2 group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description || "Explora nuestra selección de productos"}
                        </p>

                        <div className="mt-auto pt-4">
                          <span
                            className={`text-xs font-medium ${
                              selectedCategoryId === category.id
                                ? "text-orange-600"
                                : "text-orange-600 opacity-0 group-hover:opacity-100"
                            } transition-opacity`}
                          >
                            {selectedCategoryId === category.id ? "Seleccionado ✓" : "Seleccionar →"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
          </div>

          {hasMoreRight && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
              aria-label="Más categorías"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}
        </div>
      </div>
    </FadeInTransition>
  )
}

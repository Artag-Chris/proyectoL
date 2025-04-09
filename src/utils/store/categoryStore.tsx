import { create } from 'zustand';

interface CategoryState {
  selectedCategoryId: number;
  setSelectedCategory: (id: number) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategoryId: 1,
  setSelectedCategory: (id: number) => set({ selectedCategoryId: id }),
}));
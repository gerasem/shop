import { defineStore } from 'pinia';
import { ref } from 'vue'
import type { ICategory } from '@/interfaces/ICategory.ts'


export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([]);
  const currentCategory = ref<ICategory | null>(null);

  const fetchCategories = async () => {
    console.log("fetchCategories()")
    if (categories.value.length) return;

    categories.value = [
      { id: 1, image: 'https://placehold.co/400x200', title: 'Laptops', slug: 'laptops' },
      { id: 2, image: 'https://placehold.co/400x200', title: 'Smartphones', slug: 'smartphones' },
      { id: 3, image: 'https://placehold.co/400x200', title: 'Accessories', slug: 'accessories' },
      { id: 4, image: 'https://placehold.co/400x200', title: 'Gaming', slug: 'gaming' },
    ];
  };

  const setCurrentCategory = (slug: string) => {
    console.log("setCurrentCategory()")
    if (!categories.value.length) return;
    currentCategory.value = categories.value.find(cat => cat.slug === slug) || null;
  };

  return { categories, fetchCategories, currentCategory, setCurrentCategory };
});

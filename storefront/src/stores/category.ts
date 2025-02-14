import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICategory } from '@/interfaces/ICategory.ts'


export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([]);

  const fetchCategories = async () => {
    if (categories.value.length) return;

    categories.value = [
      { id: 1, image: 'https://placehold.co/400x200', title: 'Laptops', slug: 'laptops' },
      { id: 2, image: 'https://placehold.co/400x200', title: 'Smartphones', slug: 'smartphones' },
      { id: 3, image: 'https://placehold.co/400x200', title: 'Accessories', slug: 'accessories' },
      { id: 4, image: 'https://placehold.co/400x200', title: 'Gaming', slug: 'gaming' },
    ];
  };

  return { categories, fetchCategories };
});

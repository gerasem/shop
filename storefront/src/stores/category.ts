import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICategory } from '@/interfaces/ICategory.ts'
import { useLoader } from "@/composables/useLoader";
import { apiService } from '@/services/api/api';

const { startLoading, stopLoading } = useLoader('category');

export const useCategoryStore = defineStore('category', () => {

  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)

  const fetchCategories = async () => {
    if (categories.value.length) {
      return
    }
    
    startLoading();
    console.log('fetchCategories()')

    try {
      const data = await apiService.get<string[]>('/products/categories');
      categories.value = data.map((title, index) => ({
        id: index + 1,
        image: `https://placehold.co/200?text=${title}`,
        title,
        slug: title.toString().toLowerCase().replace(/\s+/g, '-'),
      }));

    } catch (err: any) {
      
    } finally {
      setTimeout(() => {
        stopLoading()
      }, 1000)
    }   
  }

  const setCurrentCategory = (slug: string) => {
    console.log('setCurrentCategory()')
    if (!categories.value.length) return
    currentCategory.value = categories.value.find((cat) => cat.slug === slug) || null
  }

  return { categories, fetchCategories, currentCategory, setCurrentCategory }
})

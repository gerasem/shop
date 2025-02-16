import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiService } from '@/services/api/api';
import type { IItem } from '@/interfaces/IItem';

export const useItemStore = defineStore('item', () => {
  const items = ref<Record<string, IItem[]>>({});

  const getItemsByCategory = async (categorySlug: string) => {
    if (items.value[categorySlug]) return;

    const data = await apiService.get<IItem[]>(`/products/category/${categorySlug}`);
    items.value[categorySlug] = data.map((title) => ({
      slug: title.toString().toLowerCase().replace(/\s+/g, '-'),
      ...title
    }));

    console.log("get items by category", items.value)
  };

  const itemsByCategory = (categorySlug: string) => {
    //console.log("ITEMS BY CATEGORY", items.value[categorySlug] || [])
    return items.value[categorySlug] || []
  }
  return { items, getItemsByCategory, itemsByCategory };
});

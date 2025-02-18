import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiService } from '@/services/api/api';
import type { IItem } from '@/interfaces/IItem';

export const useItemStore = defineStore('item', () => {
  const items = ref<Record<string, IItem[]>>({});

  const getItemsByCategory = async (categorySlug: string, limit?: number) => {
    if (items.value[categorySlug]) return;

    let url = `/products/category/${categorySlug}`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    const data = await apiService.get<IItem[]>(url);

    items.value[categorySlug] = data.map((item: IItem) => ({
      slug: item.title.toLowerCase().replace(/\s+/g, '-'),
      ...item
    }));

    console.log("get items by category", items.value);
  };


  const itemsByCategory = (categorySlug: string) => {
    //console.log("ITEMS BY CATEGORY", items.value[categorySlug] || [])
    return items.value[categorySlug] || []
  }
  return { items, getItemsByCategory, itemsByCategory };
});

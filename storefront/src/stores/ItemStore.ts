import { defineStore } from "pinia";
import { ref } from "vue";
import { apiService } from "@/services/api/api";
import type { IItem } from "@/interfaces/IItem";

export const useItemStore = defineStore("item", () => {
  const items = ref<{ category: string; products: IItem[] }[]>([]);
  const itemsOnMainPage = ref<{ category: string; products: IItem[] }[]>([]);

  const getItemsByCategory = async (categorySlug: string) => {
    if (items.value.some((item) => item.category === categorySlug)) return;

    const data = await apiService.get<IItem[]>(`/products/category/${categorySlug}`);

    items.value.push({
      category: categorySlug,
      products: data.map((item: IItem) => ({
        slug: item.title.toLowerCase().replace(/\s+/g, "-"),
        ...item,
      })),
    });

    console.log("get items by category", items.value);
  };

  const getItemsForMainPage = async (categorySlug: string, limit?: number) => {
    if (itemsOnMainPage.value.some((item) => item.category === categorySlug)) return;

    const endpoint = `/products/category/${categorySlug}${limit ? `?limit=${limit}` : ""}`;

    const data = await apiService.get<IItem[]>(endpoint);

    itemsOnMainPage.value.push({
      category: categorySlug,
      products: data.map((item: IItem) => ({
        slug: item.title.toLowerCase().replace(/\s+/g, "-"),
        ...item,
      })),
    });

    console.log("get items by category", items.value);
  };

  const getAllItems = async () => {
    const data = await apiService.get<IItem[]>("/products");

    const groupedItems = data.reduce<Record<string, IItem[]>>((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        slug: item.title.toLowerCase().replace(/\s+/g, "-"),
        ...item,
      });
      return acc;
    }, {});

    items.value = Object.entries(groupedItems).map(([category, items]) => ({
      category,
      products: items,
    }));

    console.log("get all items", items.value);
  };

  const itemsByCategory = (categorySlug: string) => {
    return items.value.find((item) => item.category === categorySlug)?.products || [];
  };

  const itemsByCategoryForMainPage = (categorySlug: string) => {
    return itemsOnMainPage.value.find((item) => item.category === categorySlug)?.products || [];
  };

  const allItems = () => {
    console.log("ALL ITEMS", items.value || []);
    return items.value || [];
  };

  return {
    items,
    itemsOnMainPage,
    itemsByCategoryForMainPage,
    getItemsByCategory,
    itemsByCategory,
    getAllItems,
    allItems,
    getItemsForMainPage,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICategory } from "@/interfaces/ICategory.ts";
import { apiService } from "@/services/api/api";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref<ICategory[]>([]);
  const currentCategory = ref<ICategory | null>(null);
  const isLoaded = ref<boolean>(false);

  const fetchCategories = async () => {
    if (categories.value.length) {
      return;
    }

    console.log("fetchCategories()");

    const data = await apiService.get<string[]>("/products/categories");
    categories.value = data.map((title, index) => ({
      id: index + 1,
      image: `https://placehold.co/200?text=${title}`,
      title,
      slug: title.toString().toLowerCase().replace(/\s+/g, "-"),
    }));

    isLoaded.value = true;
  };

  const setCurrentCategory = (slug: string) => {
    console.log("setCurrentCategory()");
    //todo redirect 404 if category not found
    if (!categories.value.length) return;
    currentCategory.value = categories.value.find((cat: ICategory) => cat.slug === slug) || null;
  };

  return { isLoaded, categories, fetchCategories, currentCategory, setCurrentCategory };
});

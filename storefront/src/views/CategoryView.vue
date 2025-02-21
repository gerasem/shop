<script setup lang="ts">
import { useMeta } from "@/composables/useMeta.ts";
import Item from "@/components/item/Item.vue";
import Text2Columns from "@/components/content/Text2Columns.vue";
import CategoriesNarrow from "@/components/category/CategoryTitleNarrow.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { useRoute } from "vue-router";
import { onMounted, watch, computed } from "vue";
import { useItemStore } from "@/stores/ItemStore";
import { useLoader } from "@/composables/useLoader";
import ItemSkeleton from "@/components/item/ItemSkeleton.vue";

onMounted((): void => {
  init(route.params.slug as string);
});

const route = useRoute();
const categoryStore = useCategoryStore();
const itemStore = useItemStore();
const { loading } = useLoader();

const init = (slug: string): void => {
  categoryStore.setCurrentCategory(slug);
  itemStore.getItemsByCategory(slug);
  if (categoryStore.currentCategory) {
    useMeta(categoryStore.currentCategory?.title);
  }
};

const items = computed(() => {
  if (categoryStore.currentCategory) {
    return itemStore.itemsByCategory(categoryStore.currentCategory.slug);
  }
  return [];
});

watch([() => route.params.slug, () => categoryStore.isLoaded], ([newSlug, isLoaded]) => {
  if (isLoaded) {
    init(newSlug as string);
  }
});
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <div class="title__container">
      <h1 class="title is-2" :class="{ 'has-skeleton': categoryStore.currentCategory === null }">
        {{ categoryStore.currentCategory?.title }}
      </h1>

      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>

    <div class="columns is-mobile is-multiline is-3">
      <template v-if="loading">
        <div
          v-for="skeleton in 8"
          :key="skeleton"
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        >
          <ItemSkeleton />
        </div>
      </template>

      <template v-else>
        <div
          v-for="item in items"
          :key="item.id"
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        >
          <Item :item="item" />
        </div>
      </template>

      <p v-if="!loading && items.length === 0" class="column">Nothing found</p>
    </div>
  </div>

  <Text2Columns header="About us"
    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores expedita, maiores! Ab cum
    porro voluptates voluptatibus voluptatum. Adipisci architecto at, atque cumque deleniti eveniet
    exercitationem expedita, id illum iure, iusto maiores molestias nisi nobis non rerum suscipit
    tempora unde velit veniam veritatis voluptas voluptate. Adipisci delectus distinctio dolores
    iure maiores, nobis praesentium similique suscipit ullam voluptatum? Aliquid animi consectetur
    consequuntur earum est et labore minima nam odio quidem quis temporibus, ut vero. Ad alias amet
    asperiores assumenda consequatur culpa dignissimos, doloribus eos fugit, molestiae nam nemo non
    officiis quasi quidem repellendus repudiandae sapiente, ullam vero voluptatibus. Dolore neque
    quia ratione!
  </Text2Columns>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { useMeta } from "@/composables/useMeta.ts";
import Item from "@/components/item/Item.vue";
import Text2Columns from "@/components/content/Text2Columns.vue";
import CategoriesNarrow from "@/components/category/CategoryTitleNarrow.vue";
import { onMounted } from "vue";
import { useItemStore } from "@/stores/ItemStore";
import { useLoader } from "@/composables/useLoader";
import ItemSkeleton from "@/components/item/ItemSkeleton.vue";

onMounted((): void => {
  itemStore.getAllItems();
});

const itemStore = useItemStore();
const { loading } = useLoader();

useMeta("All items");
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <div class="title__container">
      <h1 class="title is-2">All Items</h1>

      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="columns is-mobile is-multiline is-3">
      <div
        v-for="skeleton in 8"
        :key="skeleton"
        class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
      >
        <ItemSkeleton />
      </div>
    </div>

    <template v-else>
      <template v-for="category in itemStore.allItems()" :key="category.category">
        <h2 class="title is-3">{{ category.category }}</h2>
        <div class="columns is-mobile is-multiline is-3">
          <div
            v-for="item in category.products"
            :key="item.id"
            class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
          >
            <Item :item="item" />
          </div>

          <p v-if="itemStore.allItems().length === 0" class="column">Nothing found</p>
        </div>
      </template>
    </template>
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

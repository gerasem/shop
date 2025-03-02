<script setup lang="ts">
import { useItemStore } from '@/stores/ItemStore'
import { useCategoryStore } from '@/stores/CategoryStore'

const categoryStore = useCategoryStore()
const itemStore = useItemStore()
</script>

<template>
  <div class="columns">
    <div class="column">
      <pre>
        {{ itemStore.items }}
      </pre>
    </div>

    <div class="column">
      <pre>
        {{ categoryStore.categories }}
      </pre>
    </div>
  </div>
</template>

<style lang="scss">
pre {
  max-height: 300px;
  overflow-y: auto;
  font-size: 12px;
  line-height: 14px;
}
</style>

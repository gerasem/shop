<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ICategory } from '@/interfaces/ICategory'
import Header from '@/components/content/Header.vue'

defineProps<{
  category: ICategory
}>()

const { t } = useI18n()
</script>

<template>
  <Header :level="2">
    {{ category.name }}
    <template #action>
      <RouterLink :to="`category/${category.handle}`">
        {{ t('Show all') }}
        {{ category.name }}
      </RouterLink>
    </template>
  </Header>
</template>

<style scoped lang="scss"></style>

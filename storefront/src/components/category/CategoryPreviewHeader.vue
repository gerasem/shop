<script setup lang="ts">
import type { ICategory } from '@/interfaces/ICategory'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'

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

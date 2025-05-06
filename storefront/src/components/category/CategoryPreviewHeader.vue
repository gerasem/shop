<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ICategory } from '@/interfaces/ICategory'

defineProps<{
  category: ICategory
}>()

const { t } = useI18n()
</script>

<template>
  <div class="title__container">
    <h2 class="title is-2">{{ category.name }}</h2>

    <RouterLink
      :to="`category/${category.handle}`"
      class="title__link"
    >
      {{ t('Show all') }}
      {{ category.name }}
    </RouterLink>
  </div>
</template>

<style scoped lang="scss"></style>

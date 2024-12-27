<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BaseIcon from '@/core/components/common/BaseIcon.vue'
const { t } = useI18n();
</script>

<template>
  <RouterLink to="/" class="contact" data-test-id="contact">{{t('contact')}}</RouterLink>

  <BaseIcon icon="bag" />
</template>

<style lang="scss" scoped>

</style>

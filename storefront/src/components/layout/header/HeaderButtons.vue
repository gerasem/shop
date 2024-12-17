<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <RouterLink to="/" class="contact" data-test-id="contact">{{t('contact')}}</RouterLink>
</template>

<style lang="scss" scoped>
.contact {
  background-color: $color-primary;
}
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { localePath } from "@/composables/localePath.ts";

const { t } = useI18n();
</script>

<template>
  <RouterLink :to="localePath('')" class="contact button is-white" data-test-id="contact"
    >{{ t("contact") }}
  </RouterLink>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { useLoader } from "@/composables/useLoader";
import { useId } from "vue";
const { loading } = useLoader(useId());
</script>

<template>
  <div v-if="loading" class="loader" >
    <progress class="progress is-small is-primary" max="100">15%</progress>
  </div>
</template>

<style scoped lang="scss" >
.loader{
  position: absolute;
    height: 10px;
    z-index: 1000;
    width: 100%;
    top: -2px;
}
</style>
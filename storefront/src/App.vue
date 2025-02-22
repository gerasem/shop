<script setup lang="ts">
import { RouterView } from "vue-router";
import Loader from "@/components/loader/Loader.vue";
import InformationBanner from "@/components/information-banner/InformationBanner.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import Toast from "@/components/toast/Toast.vue";
import { onMounted } from "vue";
import { useCategoryStore } from "@/stores/CategoryStore";

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <Loader />
  <InformationBanner />
  <Navbar />
  <RouterView />
  <Footer />
  <Toast />
</template>

<style scoped></style>

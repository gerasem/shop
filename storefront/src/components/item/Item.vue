<script setup lang="ts">

</script>

<template>
<RouterLink to="#" class="item">
  <img class="item__image" src="https://placehold.co/400x400" alt="item">

  <div class="item__bottom">
    <h3 class="item__title">lorem ipsum</h3>

    <div class="item__price">2,50€</div>
  </div>
</RouterLink>
</template>

<style scoped lang="scss">
.item {
  &__image{

  }

  &__bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>

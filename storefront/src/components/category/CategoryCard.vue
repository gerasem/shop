<script setup lang="ts">

</script>

<template>
  <RouterLink to="#" class="is-hidden-mobile">
    <img class="image is-16by9 category__image" src="https://placehold.co/400x200" alt="category">
  </RouterLink>
  <RouterLink to="#" class="category__title">
    <h3>test Test 123</h3>
  </RouterLink>
</template>

<style scoped lang="scss">
.category {
  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__title {
    position: sticky;
    z-index: 1;
    display: block;
    color: $color-text;
    /*background: #fff;*/
    padding-bottom: 10px;

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        top: calc(40px + (#{$i} - 1) * 15px);
      }
    }

    @media (max-width: $screen-md-max) {
      position: static;
      background: none;
      padding-bottom: 0;
      gap: 15px;
    }
  }
}
</style>

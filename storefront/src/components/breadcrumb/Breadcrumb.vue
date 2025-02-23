<script setup lang="ts"></script>

<template>
  <nav
    class="breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <li><a href="#">Bulma</a></li>
      <li><a href="#">Documentation</a></li>
      <li><a href="#">Components</a></li>
      <li class="is-active">
        <a
          href="#"
          aria-current="page"
          >Breadcrumb</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@forward 'bulma/sass/components/breadcrumb';
</style>

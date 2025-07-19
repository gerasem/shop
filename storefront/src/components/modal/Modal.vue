<script setup lang="ts">
import Button from '@/components/form/Button.vue'

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <!-- <section class="modal-card-body">
      </section> -->
      <footer class="modal-card-foot">
        <div class="buttons">
          <Button class="is-success">Save changes</Button>
          <Button class="">Cancel</Button>
        </div>
      </footer>
    </div>
    <button
      @click="closeModal()"
      class="modal-close is-large"
      aria-label="close"
    ></button>
  </div>
</template>

<style lang="scss" scoped>
@forward 'bulma/sass/components/modal';
</style>

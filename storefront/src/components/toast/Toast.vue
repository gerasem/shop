<script setup lang="ts">
import BaseIcon from "@/components/media/BaseIcon.vue";
import { Toast, Toaster, createToaster } from "@ark-ui/vue/toast";

const toaster = createToaster({ placement: "bottom", overlap: true, gap: 15 });

const getClass = (type: string): string => {
  switch (type) {
    case "success":
      return "is-success is-light";
    case "error":
      return "is-danger is-light";
    case "info":
      return "is-warning is-light";
    default:
      return "";
  }
};
</script>

<template>
  <Toaster :toaster="toaster" v-slot="toast">
    <Toast.Root asChild>
      <div class="notification" :class="getClass(toast.type)">
        <Toast.CloseTrigger class="notification__delete">
          <button>
            <BaseIcon icon="x-lg" />
          </button>
        </Toast.CloseTrigger>
        <Toast.Title class="notification__title">{{ toast.title }}</Toast.Title>
        <Toast.Description v-if="toast.description">
          <p>
            {{ toast.description }}
          </p>
        </Toast.Description>
      </div>
    </Toast.Root>
  </Toaster>
</template>

<style scoped lang="scss">
@forward "bulma/sass/elements/notification";

.notification {
  min-width: 500px;
  max-width: 80%;

  &__delete {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &__title {
    font-weight: 700;
  }
}
</style>

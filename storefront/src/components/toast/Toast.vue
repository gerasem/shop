<script setup lang="ts">
import Icon from '@/components/media/Icon.vue'
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { watch } from 'vue'
import { useToastStore } from '@/stores/ToastStore'

const toastStore = useToastStore()
const toaster = createToaster({ placement: 'bottom', overlap: true, gap: 15 })

const getClass = (type: string): string => {
  switch (type) {
    case 'success':
      return 'is-success'
    case 'error':
      return 'is-danger'
    case 'info':
      return 'is-warning'
    default:
      return ''
  }
}

watch(
  () => toastStore.toasts,
  (newToast) => {
    if (newToast.length > 0) {
      const latestToast = newToast[newToast.length - 1]

      toaster.create({
        title: latestToast.title,
        description: latestToast.description,
        type: latestToast.type,
      })
    }
  },
  { deep: true },
)
</script>

<template>
  <Toaster
    :toaster="toaster"
    v-slot="toast"
  >
    <Toast.Root asChild>
      <div
        class="notification"
        :class="getClass(toast.type)"
      >
        <Toast.CloseTrigger class="notification__delete">
          <button>
            <Icon icon="x-lg" />
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

<script setup lang="ts">
import Icon from '@/components/media/Icon.vue'
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { watch } from 'vue'
import { useToastStore } from '@/stores/ToastStore'
import type { IToast } from '@/interfaces/IToast'

const toastStore = useToastStore()
const toaster = createToaster({ placement: 'bottom', overlap: false, gap: 15 })

const getClass = (type: string): string => {
  switch (type) {
    case 'success':
      return 'is-success is-light'
    case 'error':
      return 'is-danger is-light'
    case 'info':
      return 'is-warning is-light'
    default:
      return ''
  }
}

watch(
  () => toastStore.toasts,
  (newToasts) => {
    if (newToasts.length > 0) {
      const latestToast: IToast = { ...newToasts[newToasts.length - 1] }

      const toastObject: IToast = {
        title: latestToast.title,
        description: latestToast.description,
        type: latestToast.type,
      }

      if (latestToast.action) {
        toastObject.action = {
          label: latestToast.action.label,
          onClick: latestToast.action.onClick,
        }
      }

      if (latestToast.duration) {
        toastObject.duration = latestToast.duration
      }

      toaster.create(toastObject)
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
          <Icon icon="x-lg" />
        </Toast.CloseTrigger>
        <Toast.Title class="notification__title">{{ toast.title }}</Toast.Title>
        <Toast.Description v-if="toast.description">
          <p>
            {{ toast.description }}
          </p>
        </Toast.Description>

        <Toast.ActionTrigger
          v-if="toast.action"
          class="button is-white mt-2"
        >
          {{ toast.action?.label }}
        </Toast.ActionTrigger>
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

  &__action-button {
    background: white;
    padding: 10px 15px;
    margin-top: 10px;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      background: #e4e4e4;
    }
  }
}
</style>

import { defineStore } from "pinia";
import { ref } from "vue";

type ToastType = "info" | "success" | "error";

interface ToastMessage {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<ToastMessage[]>([]);

  const addInfo = (title: string, description?: string) => {
    toasts.value.push({
      title: title,
      description: description,
      type: "info",
    });
  };

  const addError = (title: string, description?: string) => {
    toasts.value.push({
      title: title,
      description: description,
      type: "error",
    });
  };

  const addSuccess = (title: string, description?: string) => {
    toasts.value.push({
      title: title,
      description: description,
      type: "success",
    });
  };

  return { toasts, addSuccess, addError, addInfo };
});

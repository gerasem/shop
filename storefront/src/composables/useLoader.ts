import { computed, reactive } from 'vue'

const loaderSet = reactive(new Set<number>())
const loading = computed(() => {
  console.log("loaderSet", loaderSet);
  return loaderSet.size > 0
})

export function useLoader() {
  function startLoading(id: number) {
    console.log("startLoading", id);
    loaderSet.add(id)
  }

  function stopLoading(id: number) {
    console.log("stopLoading", id);
    loaderSet.delete(id)
  }

  return { loading, startLoading, stopLoading }
}

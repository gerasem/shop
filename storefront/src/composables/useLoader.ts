import { computed, reactive } from 'vue'

const loaderSet = reactive(new Set<string>())
const loading = computed(() => {
  //console.log("loaderSet", loaderSet);
  return loaderSet.size > 0
})

export function useLoader() {
  function startLoading(id: string) {
    //console.log("startLoading", id);
    loaderSet.add(id)
  }

  function stopLoading(id: string) {
    //console.log("stopLoading", id);
    loaderSet.delete(id)
  }

  return { loading, startLoading, stopLoading }
}

import { computed } from 'vue'
import { useStore } from '@/store'

export const resize = () => {
  const store = useStore()

  const sidebar = computed(() => {
    return store.state.app.sidebar
  })

  const device = computed(() => {
    return store.state.app.device
  })

  return {
    sidebar, device
  }
}
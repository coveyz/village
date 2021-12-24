import { reactive, toRefs } from 'vue'

type initState = {
  file: File | null,
  dragRef: HTMLElement
}

export const uploadInit = () => {
  const state = reactive({
    file: null,
    dragRef: {}
  }) as initState

  const bindEvent = () => {
    const drag = state.dragRef

    drag.addEventListener('dragover', e => {
      drag.style.borderColor = 'red'
      e.preventDefault()
    })

    drag.addEventListener('dragleave', e => {
      drag.style.borderColor = '#eee'
      e.preventDefault()
    })

    drag.addEventListener('drop', e => {
      drag.style.borderColor = '#eee'
      const fileList = e.dataTransfer?.files
      if (fileList) {
        state.file = fileList[0]
        console.log('state=>', state.file)
      }
      e.preventDefault()
    })
  }



  return {
    ...toRefs(state), bindEvent
  }
}
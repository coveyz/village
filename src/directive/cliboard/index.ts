import Clipboard from 'clipboard'
import { Directive } from 'vue'

if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

let successCallback: Function | null;
let errorCallback: Function | null
let clipboardInstance: Clipboard | null


export const clipboard: Directive = {
  beforeMount(el, binding) {
    // console.log('beforMount-start=>', el, binding)

    if (binding.arg === 'success') {
      successCallback = binding.value
    } else if (binding.arg === 'error') {
      errorCallback = binding.value
    } else {
      clipboardInstance = new Clipboard(el, {
        text: () => binding.value,
        action: () => binding.arg === 'cut' ? 'cut' : 'copy'
      })

      clipboardInstance.on('success', e => {
        const callback = successCallback
        callback && callback(e)
      })

      clipboardInstance.on('error', (e) => {
        const callback = errorCallback
        callback && callback(e)
      });
    }
    // console.log('beforMount-end=>')
  },
  beforeUpdate(el, binding) {
    // console.log('update-start', el, binding)

    if (binding.arg === 'success') {
      successCallback = binding.value
    } else if (binding.arg === 'error') {
      errorCallback = binding.value
    } else {
      clipboardInstance = new Clipboard(el, {
        text: () => binding.value,
        action: () => binding.arg === 'cut' ? 'cut' : 'copy'
      })
    }

    // console.log('update-end', el, binding)
  },
  beforeUnmount(el, binding) {
    // console.log('unmount-start', el, binding)

    if (binding.arg === 'success') {
      successCallback = null
    } else if (binding.arg === 'error') {
      errorCallback = null
    } else {
      if (clipboardInstance) {
        clipboardInstance.destroy()
      }

      clipboardInstance = null
    }
    // console.log('unmount-end', el, binding)

  }
}
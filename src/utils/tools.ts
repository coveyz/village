import { reactive, toRefs, onMounted } from 'vue'

/**
 ** 验证码
 */
export const Captcha = () => {
  const state = reactive({
    code: {
      captcha: ''
    }
  })

  const getCaptcha = () => {
    state.code.captcha = '/api/captcha?_t' + new Date().getTime();
  }

  onMounted(() => {
    getCaptcha()
  })


  return { ...toRefs(state), getCaptcha }
}
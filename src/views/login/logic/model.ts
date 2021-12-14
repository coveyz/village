import { reactive, toRefs } from 'vue'
import { successMsg } from '@/utils/box'

export const UserModel = () => {

  const validatePassword = (rule: any, value: string, callback: any): void => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  }

  const state = reactive({
    model: {
      email: 'zhangkairong123@qq.com',
      captcha: '',
      emailcode: '',
      passwd: '123456'
    },
    loginFormRef: null,
    rules: {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
      ],
      captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ],
      emailcode: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
      ],
      passwd: [
        { required: true, validator: validatePassword, trigger: "blur" },
      ],
    },
  })

  const submit = () => {
    console.log('submit')
  }

  return { ...toRefs(state), submit }
}

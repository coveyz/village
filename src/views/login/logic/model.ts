import { reactive, toRefs } from "vue";
import { successMsg } from "@/utils/box";
import { useStore } from '@/store'
import { useRouter } from 'vue-router';

export const UserModel = () => {
  const store = useStore()
  const router = useRouter()

  const validatePassword = (rule: any, value: string, callback: any): void => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };

  const state = reactive({
    model: {
      email: "zhangkairong123@qq.com",
      captcha: "",
      emailcode: "",
      passwd: "123456",
    },
    loginFormRef: null,
    rules: {
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      emailcode: [
        { required: true, message: "请输入邮箱验证码", trigger: "blur" },
      ],
      passwd: [
        { required: true, validator: validatePassword, trigger: "blur" },
      ],
    },
  });

  const submit = () => {
    (state.loginFormRef as any).validate(async (valid: boolean) => {
      if (valid) {
        store.dispatch('user/login', state.model).then(() => {
          successMsg('登录 成功')
          router.push({ path: '/' })
        }).catch(err => {
          console.log('loading关')
        })
      }
    })
  }
  return { ...toRefs(state), submit };
};

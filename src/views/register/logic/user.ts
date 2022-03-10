import md5 from "md5";
import { reactive, toRefs } from "vue";
import router from "@/router";
import { RegisterData } from "@/api/user/type";
import { registerUser } from "@/api/user";
import { successMsg } from "@/utils/box";

export const RegisterUser = () => {
  const validatepasswd = (rule: any, value: string, callback: any): void => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };

  const state = reactive({
    loginFormRef: null,
    loading: false,
    model: {
      email: "zhangkairong123@qq.com",
      captcha: "",
      nickname: "coveyz",
      passwd: "123456",
      repasswd: "123456",
    },
    rules: {
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      passwd: [{ required: true, trigger: "blur", validator: validatepasswd }],
      repasswd: [
        { required: true, message: "请再次输入密码" },
        {
          trigger: "blur",
          validator: (rule: any, value: any, callback: any) => {
            if (value !== state.model.passwd) {
              callback(new Error("两次密码不一致"));
            }
            callback();
          },
        },
      ],
    },
  });
  const submit = (): void => {
    (state.loginFormRef as any).validate(async(valid: boolean) => {
      if (valid) {
        state.loading = true;
        const requrstData: RegisterData = Object.assign({}, state.model);
        requrstData["passwd"] = md5(requrstData["passwd"]);
        registerUser(requrstData).then((res) => {
          state.loading = false;
          const { code } = res.data;
          if (code === 200) {
            successMsg("注册 成功");
            jumpLogin();
          }
        });
      } else {
        console.log("还不中");
      }
    });
  };

  const jumpLogin = () => {
    console.log("router", router);
    router.push("/user/login");
  };
  return { ...toRefs(state), submit, jumpLogin };
};

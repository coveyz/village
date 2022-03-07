<template>
  <el-form :model="formMoal"
           :rules="rules"
           label-position="left"
           ref="formRef"
           class="user-form">
    <div class="title-container">
      <h3 class="title">Login Form</h3>
    </div>
    <el-form-item prop="email">
      <span class="svg-container">
        <svg-icon icon-class="email" />
      </span>
      <el-input ref="email"
                v-model="formMoal.email"></el-input>
    </el-form-item>

    <!-- 图形验证码 -->
    <el-form-item prop="captcha"
                  class="capcha-container">
      <div style="display: flex">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input v-model="formMoal.captcha"></el-input>
      </div>
      <div class="captcha">
        <img :src="code.captcha"
             @click="getCaptcha" />
      </div>
    </el-form-item>

    <el-form-item prop="emailcode"
                  class="capcha-container">
      <div style="display: flex">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input v-model="formMoal.emailcode"></el-input>
      </div>
      <div class="captcha">
        <el-button type="primary"
                   @click="sendEmailCode">{{
          sendText
        }}</el-button>
      </div>
    </el-form-item>

    <el-form-item prop="passwd">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input :type="passwordType"
                ref="password"
                v-model="formMoal.passwd"></el-input>
      <span class="svg-container"
            style="padding: 6px 15px 6px 5px">
        <svg-icon @click="switchPasswordType"
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>
    <el-button :loading="loading"
               type="primary"
               style="width: 100%; margin-bottom: 30px"
               @click.prevent="handleLogin">登录</el-button>

    <div class=""
         style="position: relative; height: 40px">
      <el-button class="thirdparty-button"
                 @click="register"
                 type="primary">
        注册
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserModel } from "./logic/model";
import { Captcha } from "@/utils/tools";
import { sendEmail } from "@/api/user";

export default defineComponent({
  setup() {
    const { model, rules, loginFormRef, submit } = UserModel();
    const { code, getCaptcha } = Captcha();
    return {
      formMoal: model,
      formRef: loginFormRef,
      rules,
      handleLogin: submit,
      code,
      getCaptcha,
    };
  },
  data() {
    return {
      loading: false,
      send: {
        timer: 0,
      },
      timer: null,
      passwordType: "password",
    };
  },
  computed: {
    sendText(): string {
      if (this.send.timer <= 0) {
        return "发送";
      }
      return `${this.send.timer}s发送`;
    },
  },
  beforeCreate() {
    console.log("beforeCreate=>", this);
  },
  created() {
    console.log("created=>", this);
  },
  unmounted() {
    console.log("destroyed", this);
  },
  methods: {
    async sendEmailCode() {
      this.send.timer = 5;

      if (this.formMoal.email === "") {
        return (this.$refs as any).email.focus();
      }
      const params = { email: this.formMoal.email };

      await sendEmail(params);

      (this.timer as any) = setInterval(() => {
        this.send.timer -= 1;

        if (this.send.timer <= 0) {
          clearInterval(this.timer as any);
        }
      }, 1000);
    },
    switchPasswordType() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        (this.$refs as any).password.focus();
      });
    },
    //* 去注册
    register() {
      this.$router.push("/user/register");
    },
  },
});
</script>

<style scoped lang="scss">
$light_gray: #eee;
$dark_gray: #889aa4;

.title-container {
  position: relative;
  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray !important;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.capcha-container {
  ::v-deep .el-form-item__content {
    display: flex;
    justify-content: space-between;
  }
  .captcha {
    width: 100px;
    img {
      height: 100%;
      width: 100%;
    }
    .el-button {
      width: 100px;
      height: 100%;
    }
  }
}
.thirdparty-button {
  position: absolute;
  right: 0;
  bottom: 6px;
}
</style>

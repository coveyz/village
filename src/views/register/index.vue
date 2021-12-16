<template>
  <el-form
    :model="formMoal"
    :rules="rules"
    label-position="left"
    ref="formRef"
    class="user-form"
  >
    <div class="title-container">
      <h3 class="title">Register Form</h3>
    </div>

    <el-form-item prop="email">
      <span class="svg-container">
        <svg-icon icon-class="email" />
      </span>
      <el-input v-model="formMoal.email"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" class="capcha-container">
      <div style="display: flex">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input v-model="formMoal.captcha"></el-input>
      </div>
      <div class="captcha">
        <img :src="code.captcha" @click="getCaptcha" />
      </div>
    </el-form-item>

    <el-form-item prop="nickname" class="capcha-container">
      <div style="display: flex">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="formMoal.nickname"></el-input>
      </div>
    </el-form-item>

    <el-form-item prop="passwd">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        type="password"
        ref="password"
        v-model="formMoal.passwd"
      ></el-input>
    </el-form-item>
    <el-form-item prop="repasswd">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        type="password"
        ref="repasswd"
        v-model="formMoal.repasswd"
      ></el-input>
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      style="width: 100%; margin-bottom: 30px"
      @click.prevent="submit"
      >注册</el-button
    >
    <div class="" style="position: relative; height: 40px">
      <el-button class="thirdparty-button" @click="jumpLogin" type="primary">
        登录
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RegisterUser } from "./logic/user";
import { Captcha } from "@/utils/tools";

export default defineComponent({
  setup() {
    const { model, loading, loginFormRef, rules, jumpLogin, submit } =
      RegisterUser();
    const { code, getCaptcha } = Captcha();
    return {
      formMoal: model,
      loading: loading,
      formRef: loginFormRef,
      rules,
      submit,
      jumpLogin,
      code: code,
      getCaptcha,
    };
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

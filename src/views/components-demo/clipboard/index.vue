<template>
  <div class="components-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard directly"
                   name="directly">
        <el-input v-model="inputData"
                  placeholder="Please input"
                  style="width:400px; max-width:100%;" />
        <el-button type="primary"
                   @click="handleClipboard(inputData,$event)"
                   style="margin-left: 10px;">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directly"
                   name="v-directive">
        <el-input v-model="inputData"
                  placeholder="Please input"
                  style="width:400px; max-width:100%;" />
        <el-button type="primary"
                   v-clipboard:copy="inputData"
                   v-clipboard:success="clipboardSuccess"
                   style="margin-left: 10px;">copy</el-button>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { clipboardSuccess, handleClipboard } from "@/utils/cliboard";

export default defineComponent({
  setup() {
    const state = reactive({
      activeName: "directly",
      inputData: "https://github.com/Armour/vue-typescript-admin-template",
      clipboardSuccess: clipboardSuccess,
    });

    return { ...toRefs(state), handleClipboard: handleClipboard };
  },
});
</script>

<style scoped>
</style>
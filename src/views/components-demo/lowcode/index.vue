<template>
  <div class="app-container">
    <!-- 🥮 头部 -->
    <el-header height="45px"
               class="flex items-center shadow-md">
      <Header />
    </el-header>
    <!-- 头部 🥮 -->
    <!-- 🫕 内容 -->
    <el-container class="layout-container">
      <el-aside class="shadow-sm"
                width="380px">
        <Navigation />
      </el-aside>
    </el-container>
    <!-- 内容 🫕  -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide } from "vue";
import {
  initVisualData,
  injectKey,
  localKey,
} from "@/utils/visual-editor/hooks/useVisualData";
import { Header, Navigation } from "./components";

export default defineComponent({
  components: { Header,Navigation },
  setup() {
    const visualData = initVisualData();
    provide(injectKey, visualData);

    const { jsonData } = visualData;

    onMounted(() => {
      sessionStorage.setItem(localKey, JSON.stringify(jsonData));
    });
    return {};
  },
});
</script>

<style scoped lang="scss">
.layout-container {
  height: calc(100vh - 45px - 50px - 34px - 40px);
}
</style>
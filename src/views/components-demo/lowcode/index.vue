<template>
  <div class="app-container">
    <!-- 🥮 头部 -->
    <el-header height="80px" class="flex items-center shadow-md">
      <Header />
    </el-header>
    <!-- 头部 🥮 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide } from "vue";
import { initVisualData, injectKey , localKey } from "@/utils/visual-editor/hooks/useVisualData";
import { Header } from './components'

export default defineComponent({
  components: { Header },
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

<style scoped>
</style>
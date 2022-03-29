<template>
  <div class="components-container">
    <aside>
      当页面滚动到指定位置时，右下角会出现“返回顶部”按钮
    </aside>
    <aside>
       您可以自定义按钮的样式、显示/隐藏、外观高度、返回高度。如果需要文本提示，可以在外部使用元素ui或工具提示元素
    </aside>
    <div class="placeholder-container">
      <div v-for="(item,key) in 70"
           :key="key">placeholder</div>
      <el-tooltip placement="top"
                  content="tooltip">
        <back-to-top :custom-style="myBackToTopStyle"
                     :visibility-height="300"
                     :back-position="50"
                     transition-name="fade" />
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BackToTop } from "@/components";

export default defineComponent({
  components: { BackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px",
        background: "#e7eaf1",
      },
    };
  },
});
</script>

<style scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
<template>
  <div class="components-container">
    <div class=""> 搜索栏相关组件 </div>
    <br />

    <search-bar :config="configData" />

    <!-- 配置文件信息 -->
    <div class="configItemStyle">Input 类型的配置文件
      <div class="">
        {{
          getConfigItem('input')
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import data from "./config/index";
import { SearchBar } from "@/components";

export default defineComponent({
  components: { SearchBar },
  data() {
    return {
      configData: data,
    };
  },
  methods: {
    getConfigItem(type: string) {
      return this.configData["search"].filter((item) => {
        return item.type === type;
      });
    },
  },
});
</script>

<style scoped lang="scss">
.configItemStyle {
  margin-top: 10px;
  border: 1px dashed red;
  padding: 10px;
}
</style>
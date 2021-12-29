<template>
  <div class="components-container">
    <div class=""> 搜索栏相关组件 </div>
    <br />

    <search-bar :config="configData"
                :searchOptions="searchOptions" />

    <!-- 配置文件信息 -->
    <div class="configItemStyle"
         v-for="(info,index) in configInfo"
         :key="index"> {{info}} 类型的配置文件
      <div v-for="item in getConfigItem(info)"
           :key="item.name"
           style="margin-bottom: 5px">
        {{ item }}
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
      searchOptions: {},
      configInfo: ["input", "select", "date", "daterange"],
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    getInit() {
      setTimeout(() => {
        this.searchOptions = Object.assign(
          {},
          { xxx: [{ label: "text1", value: "text1-value" }] }
        );

        console.log("???", this.searchOptions);
      }, 1000);
    },
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
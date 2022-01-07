<template>
  <div class="components-container">
    <div class=""> 操作栏相关组件 </div>
    <br />

    <operation-group :config="configData"
                     :multipleInfoList="testArr"
                     @handleOpertaion="handleOpertaion" />
    <br>
    {{testArr}}
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
import { OperationGroup } from "@/components";
import { defineComponent } from "vue";
import data from "./config/index";

export default defineComponent({
  components: {
    OperationGroup,
  },
  setup() {
    return {
      configData: data,
      configInfo: ["dropdownButton", "button"],
      testArr: [],
    };
  },
  methods: {
    getConfigItem(type: string) {
      return this.configData["operations"].filter((item: any) => {
        return item.buttonType === type;
      });
    },
    handleOpertaion(operation: any) {
      console.log("operation=>", operation);
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
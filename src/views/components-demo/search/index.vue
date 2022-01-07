<template>
  <div class="components-container">
    <div class=""> 搜索栏相关组件 </div>
    <br />

    <search-bar :config="configData"
                :searchOptions="searchOptions"
                @getUser="getUser">
      <template v-slot:options>
        <el-button type="primary"
                   @click="testSlotsOptions">xxx</el-button>
        <el-button type="warning"
                   @click="testSlotsOptions">xxx</el-button>
      </template>
    </search-bar>
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
import { integrationSelectData, IntegrationDataState } from "@/utils/box";

export default defineComponent({
  components: { SearchBar },
  data() {
    return {
      configData: data,
      searchOptions: {},
      configInfo: ["input", "select", "date", "daterange", "tree"],
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    selectOption(): Promise<IntegrationDataState> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const list = [{ label: "text1", value: "text1-value" }];
          resolve({ xxx: list, qq: ["12", "4"] });
        }, 1000);
      });
    },
    selectTreeData(): Promise<IntegrationDataState> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const list = [
            {
              label: "Level one 1",
              id: "Level one 1",
              children: [
                {
                  label: "Level two 1-1",
                  id: "Level two 1-1",
                  children: [
                    {
                      label: "Level three 1-1-1",
                      id: "Level three 1-1-1",
                    },
                  ],
                },
              ],
            },
            {
              label: "Level one 2",
              id: "Level one 2",
              children: [
                {
                  label: "Level two 2-1",
                  id: "Level two 2-1",
                  children: [
                    {
                      label: "Level three 2-1-1",
                      id: "Level three 2-1-1",
                    },
                  ],
                },
              ],
            },
          ];
          resolve({ treeItem2: list });
        }, 1000);
      });
    },
    getInit() {
      const box = [this.selectOption(), this.selectTreeData()];
      Promise.all(box).then((res) => {
        const data = integrationSelectData(res);
        this.searchOptions = Object.assign({}, data);
      });
    },
    getConfigItem(type: string) {
      return this.configData["search"].filter((item: any) => {
        return item.type === type;
      });
    },
    getUser(info: { type: string }) {
      const { type } = info;
      console.log("getUser=>", type);
    },
    testSlotsOptions() {
      console.log("testSlotsOptions");
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
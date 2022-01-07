<template>
  <div class="operations-wrapper">
    <div class="operation-item"
         v-for="(operation,index) in operationGroup"
         :key="index">
      <!-- 普通按钮  🐽 -->
      <el-button :type="operation.type"
                 v-if="operation.buttonType==='button'"
                 :disabled="!operation.special &&  multipleInfoList.length === 0"
                 @click="handleButtonOptions(operation)"
                 size="small">
        <svg-icon :icon-class="operation.icon"
                  v-show="operation.icon" />
        {{operation.title}}
      </el-button>
      <!-- 下拉 🦆 -->
      <el-dropdown split-button
                   :type="operation.type"
                   v-if="operation.buttonType === 'dropdownButton'"
                   :disabled="!operation.special && multipleInfoList.length === 0"
                   size="small">
        {{ operation.title }}<i class="el-icon-arrow-down el-icon--right"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in operation['options']"
                              :key="index"
                              :disabled="!operation.special && multipleInfoList.length === 0"
                              @click="handleButtonOptions(item)">{{ item.title }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
1
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<{ operations: any[] }>, //todo
      required: true,
    },
    multipleInfoList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      operationGroup: [] as any[],
    };
  },
  created() {
    this.config.operations && this.getInit();
  },
  methods: {
    getInit() {
      this.operationGroup = [];
      const arr = this.config.operations;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        this.operationGroup.push(element);
      }
    },
    handleButtonOptions(operation: any) {
      this.$emit("handleOpertaion", operation);
    },
  },
});
</script>

<style scoped lang="scss">
.operations-wrapper {
  display: flex;
  .operation-item {
    margin-left: 10px;
  }
  .operation-item:first-child {
    margin-left: 0px;
  }
}
</style>
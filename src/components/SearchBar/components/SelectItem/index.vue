<template>
  <el-select :value="item.value"
             size="small"
             :placeholder="`请选择${item.title}`"
             @change="(data ='') => changeSelectItem(item,data)"
             clearable>
    <el-option v-for="item in getOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               :disabled="item.disabled">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SeatchItemOfSelect, OptionsState } from "@/components/SearchBar/type";

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<SeatchItemOfSelect>,
    },
    searchOptions: {
      type: Object as PropType<Record<string, OptionsState[]>>,
    },
  },
  setup() {
    return {};
  },
  created() {
    if (
      typeof this.searchOptions !== "object" &&
      typeof this.item.option === "string"
    ) {
      return console.error(
        `如果当前options是字符串的话 searchOptions 需要传值 并且需要是对象形式  \n字符串options字段 需要和 searchOptions字段对应上 \ninfo:${JSON.stringify(
          this.item
        )}`
      );
    }
  },
  computed: {
    //* 返回 如果 searchOptions[] 有 返回 配置文件的
    //* 否则用 请求的 -> searchOptions[xx] 不是数组 -> [] / 报错
    getOptions(): OptionsState[] {
      if (Array.isArray(this.item.option)) {
        return this.item.option;
      } else if (this.searchOptions && this.searchOptions[this.item.option]) {
        if (!Array.isArray(this.searchOptions[this.item.option])) {
          const curSearchType = typeof this.searchOptions[this.item.option];
          this.errorMessageOfSearchOptionsItem(curSearchType);
          return [];
        }
        return this.searchOptions[this.item.option];
      } else {
        return [];
      }
    },
  },
  methods: {
    //* SearchOptionsItem 报错信息
    errorMessageOfSearchOptionsItem(type: string) {
      console.error(
        `当前searchOptions[${this.item.option}] 值应该为数组类型,而现在是${type}类型`
      );
    },
    //* change 事件
    changeSelectItem(config: SeatchItemOfSelect, val: string) {
      if (!config.isEvent) return;
      this.$emit("selectEventCollection", {
        type: "change",
        data: val,
        config: config,
      });
    },
  },
});
</script>

<style scoped>
</style>
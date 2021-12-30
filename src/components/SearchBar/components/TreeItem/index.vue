<template>
  <el-select :placeholder="`请选择${item.title}`"
             clearable
             @clear="clearItem(item)"
             :ref="item.name">
    <el-option v-for="data in getOptions"
               :key="data.label"
               :label="item.label"
               :value="item.value">
      <el-tree :data="[data]"
               node-key="label"
               :props="defaultProps"
               accordion
               @node-click="(data:any) => handleNodeClick(data,item)"></el-tree>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchItemOfTree, OptionsState } from "@/components/SearchBar/type";

type TreeItemState = {
  children: any[];
  label: string;
  id: string;
};

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<SearchItemOfTree>,
    },
    searchOptions: {
      type: Object as PropType<Record<string, OptionsState[]>>,
    },
  },
  setup() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
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
    clearItem(config: SearchItemOfTree) {
      console.log("config=>", config);
      this.launchBase({ id: "", label: "", children: [] }, config, "clear");
    },
    handleNodeClick(data: TreeItemState, config: SearchItemOfTree) {
      this.launchBase(data, config, "click");
    },

    launchBase(data: TreeItemState, config: SearchItemOfTree, type: string) {
      this.$emit("selectTreeInfo", {
        type: type,
        data,
        config,
      });
      (this.$refs[config.name] as HTMLElement).blur();
    },
  },
});
</script>

<style scoped lang="scss">
.el-select-dropdown__item {
  height: auto !important;
}
</style>
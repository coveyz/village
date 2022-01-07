<template>
  <el-form ref="form"
           :inline="true"
           size="mini"
           class="toolbar"
           v-show="searchArr.length > 0">
    <el-form-item v-for="item in searchArr"
                  :key="item.name"
                  v-show="item.show"
                  :style="{width: item.width ? `${item.width}px` : '300px'}"
                  :class="{ textSoLong: item.title.length > 6 }"
                  :label="item.title">
      <!-- 🍌 输入 🍌 -->
      <input-item v-if="item.type === 'input'"
                  v-model="item.value"
                  :item="item" />
      <!-- 🥔 单选 选择 🥔 -->
      <select-item v-if="item.type === 'select'"
                   :item="item"
                   v-model="item.value"
                   :searchOptions="searchOptions"
                   @selectEventCollection="selectEventCollection" />
      <!-- 🌳 日期选择 🌳 -->
      <date-item v-if="item.type === 'date'"
                 :item="item"
                 v-model="item.value" />
      <!-- 💣 日期区间 💣 -->
      <daterange-item v-if="item.type === 'daterange'"
                      v-model="item.value"
                      :item="item"
                      @daterang-change="daterangChange" />
      <!-- 🔫 树形选择 🔫 -->
      <tree-item v-if="item.type === 'tree'"
                 v-model="item.value"
                 :searchOptions="searchOptions"
                 :item="item"
                 @selectTreeInfo="selectTreeInfo" />
    </el-form-item>
    <!-- 🐒  操作 🐒 -->
    <div class="">
      <el-form-item>
        <el-button type="primary"
                   @click="manipulation('query')">
          查询
        </el-button>
        <el-button type="danger"
                   @click="manipulation('reset')">
          重置
        </el-button>
        <el-button type="primary"
                   v-if="showMoreOption"
                   @click="manipulation('more')">
          {{moreOptionText}}
        </el-button>
        <slot name="options" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  InputItem,
  SelectItem,
  DateItem,
  DaterangeItem,
  TreeItem,
} from "./components";
import {
  OptionsState,
  SearchItemOfDaterange,
} from "@/components/SearchBar/type";

export default defineComponent({
  components: { InputItem, SelectItem, DateItem, DaterangeItem, TreeItem },
  props: {
    config: {
      type: Object as PropType<{ search: any[] }>, //todo
      required: true,
    },
    searchOptions: {
      type: Object as PropType<Record<string, OptionsState[]>>,
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      searchArr: [] as any[],
      moreOptionText: "更多",
    };
  },
  computed: {
    showMoreOption() {
      return this.searchArr.some((item: any) => {
        return !item.show || item.level;
      });
    },
  },
  created() {
    this.config.search && this.getInit();
  },
  methods: {
    //* 初始化
    getInit() {
      this.searchArr = [];
      const arr = this.config.search;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index]; //todo
        this.searchArr.push(element);
      }
    },
    //* 更多
    moreQueryItem(config: any) {
      this.searchArr = this.searchArr.map((item) => {
        if (item.level === "special") {
          item.show = !item.show;
        }
        return item;
      });
      this.moreOptionText = this.moreOptionText === "更多" ? "隐藏" : "更多";
    },
    selectEventCollection(info: any) {
      console.log("selectEventCollection-info=>", info);
    },
    //* 时间区间 change 时间
    daterangChange(info: { time: string[]; config: SearchItemOfDaterange }) {
      const { time, config } = info;
      config.startValue = time ? time[0] : "";
      config.endValue = time ? time[1] : "";
    },
    selectTreeInfo(info: any) {
      console.log(info);
      const { data, config } = info;
      config.value = data.id || "";
      config.label = data.label || "";
    },
    manipulation(type: string, config?: any) {
      switch (type) {
        case "query":
          this.getUser();
          break;
        case "reset":
          this.reset();
          break;
        case "more":
          this.moreQueryItem(config);
          break;
        default:
          break;
      }
    },
    getUser() {
      this.$emit("getUser", { type: "search" });
    },
    reset() {
      this.searchArr = this.searchArr.map((item: any) => {
        if (item.type === "tree") {
          item["label"] = "";
        } else if (item.type === "daterange") {
          item["startValue"] = "";
          item["endValue"] = "";
        }
        item["value"] = Array.isArray(item["value"]) ? [] : "";
        return item;
      });
      this.$emit("reset");
    },
  },
});
</script>

<style scoped lang="scss">
.toolbar {
  background-color: #f2f2f2;
  padding: 5px 5px 0 5px;
}
.textLong {
  ::v-deep .el-form-item__label {
    line-height: 20px;
  }
}
</style>
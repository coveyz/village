<template>
  <el-date-picker :value="item.value"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  :disabled-date="(time:any) => disabledDate(time,item)"
                  @change="(time:any) => changDateRange(time,item)">
  </el-date-picker>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchItemOfDaterange } from "@/components/SearchBar/type";

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<SearchItemOfDaterange>,
    },
  },
  setup() {
    return {};
  },
  methods: {
    changDateRange(time: string[], config: SearchItemOfDaterange) {
      this.$emit("daterang-change", { time, config });
    },
    disabledDate(time: any, config: SearchItemOfDaterange) {
      if (!time.value) {
        return time.getTime() > Date.now();
      }
    },
  },
});
</script>

<style scoped>
</style>
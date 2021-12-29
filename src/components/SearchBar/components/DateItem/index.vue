<template>
  <el-date-picker type="date"
                  :value="item.value"
                  :placeholder="`请输入${item.title}`"
                  value-format="YYYY/MM/DD">
  </el-date-picker>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchItemOfDate } from "@/components/SearchBar/type";

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<SearchItemOfDate>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
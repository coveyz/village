<template>
  <el-input :value="item.value"
            clearable
            :placeholder="`请输入${item.title}`"
            :maxlength="item.maxlength ? item.maxlength : 20" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchItemOfInput } from "@/components/SearchBar/type";

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<SearchItemOfInput>,
    },
  },
});
</script>

<style scoped>
</style>
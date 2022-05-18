<template>
  <div class="list-item"
       :index="index"
       ref="element">
    {{item?.id}}
    <br />
    {{item?.value}}
    <div v-if="enableImag && (item &&item.src)">
      <slot name="image" />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { itemState } from "../type";

export default defineComponent({
  setup() {
    return {};
  },
  props: {
    item: {
      type: Object as PropType<itemState>,
    },
    index: {
      type: Number || String,
    },
  },
  data() {
    return {
      enableImag: true,
    };
  },
  mounted() {
    this.measureItem(this.index);
    console.log('????')
  },
  methods: {
    measureItem(index?: number) {
      const item = this.$refs.element as Element;
      console.log("xxxx=>", index, item);
      if (item && item.clientHeight) {
        this.$emit("measureText", index, item.clientHeight);
      }
    },
  },
});
</script>

<style scoped>
</style>

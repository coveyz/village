<template>
  <component :is="type"
             v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    const type = computed(() => {
      return "router-link";
    });
    return {
      type,
    };
  },
  methods: {
    linkProps(to: string) {
      //* 特殊 a标签跳转方案
      return {
        to: to,
      };
    },
  },
});
</script>

<style scoped>
</style>
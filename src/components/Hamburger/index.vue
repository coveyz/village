<template>
  <div class="navbar-container">
    <svg-icon icon-class="hamburger"
              @click="toggleClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    },
  },
});
</script>

<style scoped lang="scss">
.navbar-container {
  padding: 0 15px;
}
</style>
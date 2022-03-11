<template>
  <div class="components-container">

    <div class=""
         id="card">

      card

    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <el-button @click.prevent.stop="guide"
               type="primary">
      Show Guide
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import step from "./step";

export default defineComponent({
  setup() {
    let driver: Driver | null = null;
    onMounted(() => {
      driver = new Driver();
    });

    const guide = () => {
      if (driver) {
        driver.defineSteps(step);
        driver.start();
      }
    };

    return {
      guide,
    };
  },
});
</script>

<style scoped>
</style>
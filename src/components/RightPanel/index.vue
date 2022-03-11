<template>
  <div class="handle-button"
       @click="show=true"
       :style="{'top': buttonTop + 'px','backgroundColor': theme}">
    <!-- <svg-icon :icon-class="show ? 'close' : 'setting'" /> -->
    <svg-icon icon-class='setting' />
  </div>

  <el-drawer title="Page style setting"
             v-model="show"
             size="300px"
             destroy-on-close>
    <slot />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  props: {
    buttonTop: {
      type: Number,
      default: 250,
    },
  },
  setup() {
    const store = useStore();
    const theme = computed(() => {
      return store.state.setting.theme || "#1890ff";
    });
    const state = reactive({
      show: false,
    });
    return {
      theme,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.handle-button {
  height: 48px;
  line-height: 48px;
  width: 48px;
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 99;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
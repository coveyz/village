<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="tagsView"
                 class="drawer-switch" />
    </div>
    <div class="drawer-item">
      <span>Fixed Header</span>
      <el-switch v-model="fixedHeader"
                 class="drawer-switch" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const tagsView = computed({
      get: () => {
        return store.state.setting.tagsView;
      },
      set: (val) => {
        store.dispatch("setting/changeSetting", {
          key: "tagsView",
          value: val,
        });
      },
    });
    const fixedHeader = computed({
      get: () => {
        return store.state.setting.fixedHeader;
      },
      set: (val) => {
        store.dispatch("setting/changeSetting", {
          key: "fixedHeader",
          value: val,
        });
      },
    });

    return {
      tagsView,
      fixedHeader,
    };
  },
});
</script>

<style scoped lang="scss">
.drawer-container {
  // padding: 0 24px;
  font-size: 15px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    color: grba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
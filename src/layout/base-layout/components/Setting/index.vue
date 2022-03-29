<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>Theme Color</span>
      <ThemePicker style="float: right;height: 26px;margin: -3px 8px 0 0;"
                   @change="themeChange" />
    </div>
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
import { ThemePicker } from "@/components";

export default defineComponent({
  components: { ThemePicker },
  setup () {
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

    const themeChange = (val: string) => {
      
      store.dispatch("setting/changeSetting", {
        key: "theme",
        value: val,
      });
    };

    return {
      tagsView,
      fixedHeader,
      themeChange,
    };
  },
});
</script>

<style scoped lang="scss">
.drawer-container {
  padding: 0 24px;
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
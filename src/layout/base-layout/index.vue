<template>
  <div :class="classObj"
       class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container"
         :class="{hasTagsView: needTagsView}">
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />
        <TagView v-if="needTagsView" />
      </div>
      <AppMain />
    </div>
    <RightPanel>
      <Setting />
    </RightPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { AppMain, Sidebar, Navbar, TagView, Setting } from "./components";
import { RightPanel } from "@/components";
import { resize } from "./logic/resize";
import { useStore } from "@/store";

export default defineComponent({
  components: { AppMain, Sidebar, Navbar, TagView, RightPanel, Setting },
  setup() {
    const { device, sidebar } = resize();
    const store = useStore();
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === "mobile",
      };
    });

    const needTagsView = computed(() => store.state.setting.tagsView);
    const fixedHeader = computed(() => store.state.setting.fixedHeader);

    return {
      classObj,
      needTagsView,
      fixedHeader,
    };
  },
  methods: {
    //todo 当现在是手机的话 需要点击右侧 关闭 sidebar
    handleClickOutside() {
      return;
    },
  },
});
</script>

<style scoped lang="scss">
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
</style>

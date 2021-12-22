<template>
  <div :class="classObj"
       class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container"
         :class="{hasTagsView: needTagsView}">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tag-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { AppMain, Sidebar, Navbar, TagView } from "./components";
import { resize } from "./logic/resize";
export default defineComponent({
  components: { AppMain, Sidebar, Navbar, TagView },
  setup() {
    const { device, sidebar } = resize();
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === "mobile",
      };
    });
    const needTagsView = computed(() => true);
    const fixedHeader = computed(() => false);

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
</style>

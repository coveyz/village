<template>
  <div :style="variables">
    <!-- todo logo -->

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu"
               :collapse="isCollapse"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="false"
               :active-text-color="variables.menuActiveText"
               mode="vertical">
        <sidebar-item v-for="route in routes"
                      :key="route.path"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";
import { useStore } from "@/store";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/_variables.scss";
import { resize } from "@/layout/base-layout/logic/resize";

export default defineComponent({
  components: { SidebarItem },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { sidebar } = resize();

    const routes = computed(() => {
      return store.getters.permission_routes as RouteRecordRaw[];
    });

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const showLogo = computed(() => {
      return store.state.setting.sidebarLogo;
    });
    const isCollapse = computed(() => {
      // return false;
      console.log("isCollapse==>", sidebar.value.opened);
      return !sidebar.value.opened;
    });

    return {
      routes,
      activeMenu,
      showLogo,
      isCollapse,
      variables,
    };
  },
});
</script>

<style scoped>
::v-deep .el-sub-menu__title {
  display: inherit;
}
</style>
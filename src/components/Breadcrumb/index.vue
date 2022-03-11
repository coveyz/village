<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbs"
                          :key="item.path">
        <span class="no-redirect"
              v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1">
          {{item.meta && item.meta.title}}
        </span>
        <a v-else
           @click.prevent="handleLink(item)">
          {{item.meta && item.meta.title}}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, toRefs, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import router from "@/router";
import { compile } from "path-to-regexp";

export default defineComponent({
  setup() {
    const currentRoute = useRoute();

    const state = reactive({
      breadcrumbs: [] as Array<RouteLocationMatched>,
    });

    const isDashboard = (route: RouteLocationMatched): boolean => {
      const name = route && route.name;
      if (!name) return false;
      return (
        name.toString().trim().toLocaleLowerCase() ===
        "Dashboard".toLocaleLowerCase()
      );
    };

    const getBreadcrumb = () => {
      let matched = currentRoute.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [
          { path: "/dashboard", meta: { title: "导航" } } as any,
        ].concat(matched);
      }

      state.breadcrumbs = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
      });

      console.log("state.breadcrumbs=.", state.breadcrumbs);
    };

    const pathCompile = (path: string) => {
      const { params } = currentRoute;
      const toPath = compile(path);
      // console.log("pathCompile=>pathCompile=>", toPath(params));
      return toPath(params);
    };

    const handleLink = (item: any) => {
      const { redirect, path } = item;

      if (redirect) {
      }

      router.push(pathCompile(path)).catch((err) => {
        console.warn("err=>", err);
      });
    };

    watch(
      () => currentRoute.path,
      (path) => {
        console.log("path=>", path);
        getBreadcrumb();
      }
    );

    onBeforeMount(() => {
      getBreadcrumb();
    });

    return {
      ...toRefs(state),
      handleLink,
    };
  },
});
</script>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .el-breadcrumb__inner,
  .el-breadcrumb__inner a {
    font-weight: 400 !important;
  }
}
</style>
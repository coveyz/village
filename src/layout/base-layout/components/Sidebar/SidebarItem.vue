<template>
  <div v-if="!item.meta || !item.meta.hidden"
       :class="[
      isNest ? 'simple-mode' : 'full-mode',
      {'first-level': isFirstLevel}
    ]">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <app-link v-if="theOnlyOneChild.meta"
                :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)"
                      :class="{'submenu-title-noDropdown': !isNest}">
          <svg-icon v-if="theOnlyOneChild.meta.icon"
                    :icon-class="theOnlyOneChild.meta.icon" />
          <template #title>
            <span v-if="theOnlyOneChild.meta.title">
              {{theOnlyOneChild.meta.title}}
            </span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else
                 :index="resolvePath(item.path)">
      <template #title>
        <svg-icon v-if="item.meta && item.meta.icon"
                  :icon-class="item.meta &&item.meta.icon" />
        <span v-if="item.meta &&item.meta.title">
          {{item.meta.title}}
        </span>
      </template>

      <template v-if="item.children">
        <sidebar-item v-for="child in item.children"
                      :key="child.path"
                      :item="child"
                      :is-nest="true"
                      :is-first-level="false"
                      :base-path="resolvePath(child.path)"
                      class="nest-menu" />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from "path-browserify";
import { defineComponent, PropType, computed } from "vue";
import { RouteRecordRaw } from "vue-router";
import AppLink from "./Link.vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
    isFirstLevel: {
      type: Boolean,
      // required: true,
    },
  },
  name: "SidebarItem",
  components: { AppLink },
  setup(props) {
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true;
      } else {
        return false;
      }
    });

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            return true;
          }
        });
        return showingChildren.length;
      } else {
        return 0;
      }
    });

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null;
      }

      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }

      return { ...props.item, path: "" };
    });

    const resolvePath = (routePath: string) => {
      return path.resolve(props.basePath, routePath);
    };

    return {
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath,
    };
  },
});
</script>

<style lang="scss" >

</style>



<template>
  <el-tabs v-model="activeName"
           tab-position="left"
           class="left-aside">
    <template v-for="tab in tabs"
              :key="tab.name">
      <el-tab-pane :name="tab.name"
                   lazy>
        <template #label>
          <div class="tab-item">
            {{tab.label}}
          </div>
        </template>
        <component :is="tab.comp" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import components from "./components";

export default defineComponent({
  setup() {
    console.log("components=>", components);

    const tabs = Object.entries(components)
      .map(([name, component]) => {
        // console.log(name,component)
        const { label, order } = component;

        return { label, order, name, comp: component };
      })
      .sort((a, b) => a.order - b.order);

    const state = reactive({
      tabs: tabs,
      activeName: tabs[0]["name"],
    });

    console.log("tabs=>", tabs);

    return { ...toRefs(state) };
  },
});
</script>

<style scoped lang="scss">
.left-aside {
  height: 100%;
  contain: layout;
}
</style>
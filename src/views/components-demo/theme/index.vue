
<template>
  <div class="app-container">
    <div class="options">
      <span class="field-label">Change Theme : </span>
      <el-switch v-model="theme" />
    </div>
    <div class="options">
      <span class="field-label">Global Size : </span>
      {{$store.state.app}}
      <el-select v-model="value"
                 class="m-2"
                 placeholder="Select"
                 @change="handleSetSize"
                 size="large">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
    </div>

    <div class="block">
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success"
                 color="#626aef">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
// import magicStyle from "@/styles/element-ui.scss";
import { defineComponent, nextTick } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { toggleClass } from "@/utils/box";
import "@/assets/custom-theme/index.css"; // the theme changed version element-ui css

export default defineComponent({
  setup() {
    const store = useStore();
    const { fullPath } = useRoute();
    const router = useRouter();

    const handleSetSize = (size: string) => {
      store.dispatch("app/setSize", size);
      refreshView();
    };
    const refreshView = () => {
      store.dispatch("tagsView/delAllCachedViews", undefined);
      nextTick(() => {
        router.replace({ path: "/redirect" + fullPath }).catch((err) => {
          console.warn(err);
        });
      });
    };

    return {
      handleSetSize,
    };
  },
  data() {
    return {
      theme: false,
      value: "",
      options: [
        { label: "Default", value: "default" },
        { label: "Medium", value: "medium" },
        { label: "Small", value: "small" },
        { label: "Mini", value: "mini" },
      ],
    };
  },
  watch: {
    theme() {
      toggleClass(document.body, "custom-theme");
    },
  },
});
</script>

<style lang="scss" scoped>
.block {
  padding: 30px 24px;
}
.field-label {
  vertical-align: middle;
}
.options {
  margin-bottom: 10px;
}
</style>


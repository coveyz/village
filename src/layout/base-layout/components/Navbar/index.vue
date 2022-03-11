<template>
  <div class="navbar">
    <Hamburger id="hamburger-container"
               class="hamburger-container"
               @toggle-click="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container"
                id="breadcrumb-container" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Hamburger, Breadcrumb } from "@/components";
import { useStore } from "@/store";

export default defineComponent({
  components: { Hamburger, Breadcrumb },
  setup() {
    const store = useStore();
    const toggleSideBar = () => {
      store.dispatch("app/toggleSideBar");
    };
    return {
      toggleSideBar,
    };
  },
});
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
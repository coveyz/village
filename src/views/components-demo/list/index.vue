<template>
  <div class="components-container">
    <VList :list="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import faker from "faker";
import VList from "./components/vlist.vue";
import { itemState } from "./type";

export default defineComponent({
  components: { VList },
  data() {
    return {
      data: [] as itemState[],
    };
  },
  created() {
    for (let index = 0; index < 100; index++) {
      const item = {
        id: index,
        value: faker.lorem.paragraphs(),
        src: "",
      };
      if (index % 10 === 1) {
        item.src = faker.image.image();
      }
      this.data.push(item);
    }

    console.log(
      "??",
      this.data.map((item) => {
        return { index: item.id, src: item.src };
      })
    );
  },
  beforeUnmount() {
    console.log('beforeDestroy')
  },
});
</script>

<style scoped lang="scss">
.viewport {
  height: 100vh;
  overflow: scroll;
  position: relative;
}
.list-phantom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.list-item {
  padding: 16px 0px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
<template>
  <!-- 📬 可视区域 📬-->
  <div class="viewport"
       ref="viewport"
       @scroll="onScroll">
    <!-- 🏮 占位区域, 列表总高度 🏮 -->
    <div class="list-phantom"
         ref="phantom"
         :style="{height: `${phantomHeight}px`}" />
    <!-- 🎐 可以渲染的区域 🎐 -->
    <div class="list-area"
         ref="listArea"
         :style="{transform: `translate3d(0,${startOffset}px,0)`}">
      <template v-for="(item,index) in vlist"
                :key="index">
        <Item :index="item.id"
              :item="item"
              @measureText="measureText">
          <template v-slot:image>
            <img :src="item.src"
                 alt=""
                 @load="() => measure(index)" />
          </template>
        </Item>
      </template>
      <!-- <template v-for="(item,index) in list"
                :key="item.id">
        <template v-if="index >= startIndex && index<=endIndex ">
          <Item :index="index"
                :item="item"
                @measureText="measureText">
            <div v-if="enableImag && (item &&item.src)">
            <template v-slot:image>
              <img :src="item.src"
                   alt=""
                   @load="() => measure(index)" />
            </template>
            </div>
          </Item>
        </template>
      </template> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { itemState, positionState } from "../type";
import Item from "./item.vue";

export default defineComponent({
  components: { Item },
  props: {
    list: {
      type: Array as PropType<itemState[]>,
      default: () => [],
    },
  },
  data() {
    return {
      // viewport: null, //* 可视区域
      // listArea: null, //* 渲染区域
      // phantom: null, //* 占位区域, 列表总高度
      defaultItemSize: 100,
      // positions: [] as positionState[], //* 记录列表项的位置信息
      // phantomHeight: 0, //* 列表总高度
      viewCount: 10, //* 渲染数量
      startIndex: 0, //* 开始的 index
      startOffset: 0, //* 偏移量
    };
  },
  mounted() {
    // this.getInitPosition();
    // this.getInitPhantomHeight();
    console.log("🎎", this.positions);
    (window as any).positions = this.positions; //* 可能没用
  },
  computed: {
    positions: {
      //* 记录列表项的位置信息
      get(): positionState[] {
        return this.list.map((item, index) => {
          return {
            index,
            height: this.defaultItemSize,
            top: index * this.defaultItemSize,
            bottom: (index + 1) * this.defaultItemSize,
          };
        });
      },
      set(): positionState[] {
        console.log("positions=>set=>");
        return this.positions;
      },
    },
    //* 列表总高度
    phantomHeight: {
      get(): number {
        return this.positions.reduce((acc, cur) => {
          acc += cur.height;
          return acc;
        }, 0);
      },
      set(totalHeight: number): number {
        console.log("phantomHeight=>set=>");
        return totalHeight;
      },
    },
    //* 结束的index
    endIndex(): number {
      return this.startIndex + this.viewCount;
    },
    vlist() {
      return this.list.slice(this.startIndex, this.endIndex);
    },
  },
  watch: {
    positions() {
      console.log("position=>change=>");
    },
  },
  methods: {
    //* 获取 startIndex 二分查找
    getStartIndex(scrollTop: number) {
      let item = this.positions.find((item) => item && item.bottom > scrollTop);
      return item?.index;
    },
    //* 获取 startOffset
    getStartOffset(startIndex: number) {
      return startIndex >= 1 ? this.positions[startIndex - 1].bottom : 0;
    },
    /**
     * 获取滚动距离
     * 根据 scrollTop 和 itemSize 计算 startIndex 和 endIndex
     * 根据 scrollTop 和 itemSize 计算 startOffset
     * 显示 startIndex 和  endIndex 之间的元素
     * 设置 listArea 的偏移量为 startOffset
     */
    onScroll() {
      //* 滚动的距离
      const scrollTop = (this.$refs.viewport as Element).scrollTop;
      const startIndex = this.getStartIndex(scrollTop) || 0;
      this.startIndex = startIndex;
      const startOffset = this.getStartOffset(startIndex);
      this.startOffset = startOffset;
      // console.log(">?", startIndex, scrollTop,this.positions);
      // console.log(">?", startIndex, scrollTop, startOffset);
    },
    //* 测量高度
    measure(index: number, height?: number) {
      // console.log("index=>", index, height);
      if (!height) {
        const item = (this.$refs.listArea as Element).querySelector(
          `[index="${index}"]`
        );
        height = item ? item.clientHeight : this.defaultItemSize;
        // console.log("item=>", item);
      }
      // console.log(height);

      this.positions.forEach((item) => {
        if (item.index === index) {
          let oldHeight = item.height,
            dHeight = oldHeight - (height as number);
          // console.log("index=>", dHeight);
          //* 向下更新
          if (dHeight) {
            item.height = height as number;
            item.bottom = item.bottom - dHeight;

            for (let key = index + 1; key < this.positions.length; key++) {
              this.positions[key].top = this.positions[key - 1].bottom;
              this.positions[key].bottom = this.positions[key].bottom - dHeight;
            }
          }
        }
      });

      // console.log("pos=>", this.positions);
    },
    measureText(index: number, height: number) {
      this.measure(index, height);
      console.log("measureText=>", index, height);
    },
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
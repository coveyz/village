<template>
  <div class="components-container"
       ref="box">
    <!-- <el-button @click="xxx">明水印生成</el-button>
    <img id="pic"
         src="@/assets/source-material/source1.jpg"
         ref="watermark-image"
         height="500"
         alt=""> -->
    <img id="pic"
         ref="watermark-image"
         src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3c3c98ebfce4ae28db981dfabedc1d8~tplv-k3u1fbpfcp-zoom-1.image"
         alt="原始图片"
         height="500"
         crossorigin="anonymous">

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      boxWidth: 0,
      boxHeight: 0,
    };
  },
  mounted() {
    //* 水印容器
    // const container = this.generateWatermarkContainer();
    //* 监听包含水印节点的容器
    // this.observeWatermarkContainer(container.parentNode);
    const pic = this.$refs["watermark-image"] as HTMLImageElement;
    const picParent = pic.parentNode as Node;
    console.log("pic=>", pic, picParent);
    const canvasNode = document.createElement("canvas");
    const picWithWatermark = this.createImageWithWatemark(pic, canvasNode);
    picParent.replaceChild(picWithWatermark, pic);
  },

  methods: {
    xxx() {
      const pic = this.$refs["watermark-image"] as HTMLImageElement;
      const picParent = pic.parentNode as Node;
      console.log("pic=>", pic, picParent);
      const canvasNode = document.createElement("canvas");
      const picWithWatermark = this.createImageWithWatemark(pic, canvasNode);
      picParent.replaceChild(picWithWatermark, pic);
    },
    createImageWithWatemark(img: HTMLImageElement, canvas: HTMLCanvasElement) {
      const imgWith = img.clientWidth;
      const imgHeight = img.clientHeight;
      canvas.width = imgWith;
      canvas.height = imgHeight;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0, imgWith, imgHeight);
      ctx.font = "20px YaHei";
      ctx.fillStyle = "yellow";
      ctx.fillText("covey", imgWith / 2, imgHeight / 2);
      console.log("ctx=>", ctx);
      const image = this.canvasToImage(canvas.toDataURL("image/jpeg"));
      console.log("image=>", image);
      return image;
    },
    //* canvas 节点 转换成 image 节点
    canvasToImage(base64: string): HTMLImageElement {
      console.log("base64", base64);
      const image = new Image();
      image.crossOrigin = "";
      image.src = base64;
      return image;
    },
    observeWatermarkContainer(targetNode: any) {
      // console.log("targetNode=>", targetNode);
      const cb = (mutationList: any, observe: any) => {
        for (const mutation of mutationList) {
          const { removedNodes = [] } = mutation;
          // console.log("mutation=>", removedNodes);
          const node = Array.from(removedNodes).find(
            (node: any) => node.id == "page-watermark"
          );
          // console.log("find-node=>", node);
          if (node) {
            targetNode.innerHTML = "";
            window.location.reload();
          }
        }
      };
      const observe = new MutationObserver(cb);
      observe.observe(targetNode, {
        attributes: true,
        childList: true,
      });
    },
    /**
     ** 生成全局水印
     * @returns 水印容器
     */
    generateWatermarkContainer(): HTMLCanvasElement {
      const body = this.$refs["box"] as HTMLElement;
      this.boxWidth = body.clientWidth;
      this.boxHeight = body.clientHeight;
      const canvas = document.createElement("canvas");
      const style = `position: absolute; width: ${this.boxWidth}px; height: ${this.boxHeight}px; top: 0; left: 0; z-index: 1000; pointer-events: none;`;
      canvas.width = this.boxWidth;
      canvas.height = this.boxHeight;
      canvas.setAttribute("id", "page-watermark");
      canvas.setAttribute("style", style);
      this.generateWatermark(canvas);
      body.appendChild(canvas);
      return canvas;
    },
    /**
     ** 生成全局水印
     */
    generateWatermark(canvas: HTMLCanvasElement) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.font = "20px YaHei";
      ctx.fillStyle = "black";
      ctx.rotate((-45 * Math.PI) / 180);

      for (let x = -this.boxWidth; x < 2 * this.boxWidth; x += 150) {
        for (let y = -this.boxHeight; y < 2 * this.boxHeight; y += 150) {
          this.writeInfo(ctx, x, y);
        }
      }

      // console.log(canvas, ctx);
    },
    writeInfo(ctx: CanvasRenderingContext2D, x: number, y: number) {
      // console.log({ ctx, x, y });
      ctx.beginPath();
      ctx.fillText("吴彦祖", x, y);
      ctx.closePath();
    },
  },
});
</script>

<style scoped lang="scss">
.watermark-image {
  height: 30vh;
}
</style>
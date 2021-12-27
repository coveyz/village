<template>
  <div class="components-container">
    <div class="">方向悬停图片感知</div>
    <div class="container">
      <div class="card"
           id="card"
           v-for="(item,index) in list"
           :key="index"
           @mouseenter="(e) => imagingPostion(e,index)"
           @mouseout="(e) => imagingPostion(e,index)">
        <span></span>
        <div class="img-box">
          <img :src="getImg(item)"
               alt="">
        </div>
        <div class="content">
          <div class="">
            <h1>{{item.title}}</h1>
            <p>
              {{item.content}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type ImgState = {
  src: string;
  title: string;
  content: string;
};

export default defineComponent({
  data() {
    return {
      list: [
        {
          src: "source1",
          title: "Card Title",
          content: "啦啦啦 方向悬停图片感知",
        },
        {
          src: "source2",
          title: "Card Title",
          content: "啦啦啦 方向悬停图片感知",
        },
        {
          src: "source3",
          title: "Card Title",
          content: "啦啦啦 方向悬停图片感知",
        },
      ] as ImgState[],
    };
  },
  methods: {
    getImg(item: ImgState) {
      const imgModules = require.context(
        "@/assets/source-material",
        false,
        /\.*$/
      );
      const imgs = imgModules.keys();

      for (const key of imgs) {
        if (key.indexOf(item.src) > -1) {
          return imgModules(key);
        }
      }

      console.error(`本地仓库中不存在 ${item.src} 图片`);
    },
    imagingPostion(e: MouseEvent, index: number) {
      const dom = document.querySelectorAll(".card")[index]; //* 得到当前的DOM
      const x = e.offsetX;
      const y = e.offsetY;

      //* 当前的 span 标签
      const curDomSpan = Array.from(dom.children).filter(
        (dom) => dom.localName === "span"
      )[0] as HTMLStyleElement;
      curDomSpan.style.top = y + "px";
      curDomSpan.style.left = x + "px";
    },
  },
});
</script>


<style scoped lang="scss">
.container {
  max-width: 1050px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .card {
    position: relative;
    width: 320px;
    height: 420px;
    margin: 15px;
    overflow: hidden;
    span {
      position: absolute;
      display: block;
      width: 0px;
      height: 0px;
      border-radius: 50%;
      opacity: 0.95;
      background: #9c27b0;
      z-index: 1;
      transition: width 0.5s, height 0.5s;
      transform: translate(-50%, -50%);
    }
    &:hover span {
      width: 1000px;
      height: 1000px;
    }
    .img-box {
      img {
        object-fit: cover;
      }
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      div {
        padding: 40px;
        color: #fff;
        visibility: hidden;
        opacity: 0;
        transform: translateY(50px);
        transition: 0.2s;
      }
    }
    &:hover .content div {
      visibility: visible;
      transform: translateY(0);
      opacity: 1;
    }
  }

  .img-box,
  .img-box img,
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="components-container">
    <video class="video"
           width="600"
           controls></video>
    <br />
    <el-button type="primary"
               @click="recordVideo">录像</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  methods: {
    async recordVideo() {
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      //* 需要更好的浏览器 支持
      const mime = MediaRecorder.isTypeSupported("video/wbm;codecs=vp9")
        ? "video/webm; codecs=vp9"
        : "video/webm";

      let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime,
      });

      let chunks: Blob[] = [];

      mediaRecorder.addEventListener("dataavailable", (e: BlobEvent) => {
        chunks.push(e.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        let blob = new Blob(chunks, {
          type: chunks[0].type,
        });
        let url = URL.createObjectURL(blob);
        let video = document.querySelector(".video") as any;

        video.src = url;

        let a = document.createElement("a");
        a.href = url;
        a.download = "video.webm";
        a.click();
      });

      //* 需要手动启动
      mediaRecorder.start();
    },
  },
});
</script>

<style scoped>
</style>
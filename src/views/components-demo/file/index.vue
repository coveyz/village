<template>
  <el-button type="primary"
             size="small"
             @click="upload">文件上传</el-button>
  <br />
  <br />
  <!-- 文件区域 -->
  <div id="drag"
       ref="dragRef">
    <input type="file"
           name="file"
           @change="handleFileChanges">
  </div>
  <!-- 布隆过滤器 -->
  <div class="hash-progress-style">
    <p>布隆过滤器 计算hash的进度</p>
    <el-progress :stroke-width='20'
                 :text-inside="true"
                 :percentage="hashProgress"></el-progress>
  </div>
  <!-- 时间切片 -->
  <div class="hash-progress-style">
    <p>时间切片 计算hash的进度</p>
    <el-progress :stroke-width='20'
                 :text-inside="true"
                 :percentage="timeHashProgress"></el-progress>
  </div>

  <div class="cube-container"
       :style="{width:cubeWidth+'px'}">
    <div class="cube"
         v-for="chunk in chunks"
         :key="chunk.name">
      <div :class="{
              'uploading':chunk.progress>0&&chunk.progress<100,
              'success':chunk.progress==100,
              'error':chunk.progress<0
            }"
           :style="{height:chunk.progress+'%'}">
        <i class="el-icon-loading"
           style="color:#f56c6c"
           v-if="chunk.progress<100 && chunk.progress>0"></i>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { errorMsg, successMsg } from "@/utils/box";
import { defineComponent, onMounted } from "vue";
import {
  uploadInit,
  hashWork,
  chunksOptions,
  fileChunksState,
  upload,
} from "./logic";

export default defineComponent({
  setup() {
    const { file, dragRef, bindEvent } = uploadInit();
    const {
      hashProgress,
      timeHashProgress,
      calculHashWorkOfTime,
      calculHashSample,
    } = hashWork();

    const { createFileChunks } = chunksOptions();

    const { checkoption, integrationChunks, sendRequest, mergeFileRequest } =
      upload();

    onMounted(() => {
      bindEvent();
    });

    return {
      file,
      dragRef,
      calculHashSample,
      calculHashWorkOfTime,
      hashProgress,
      timeHashProgress,
      createFileChunks,
      checkoption,
      integrationChunks,
      sendRequest,
      mergeFileRequest,
    };
  },
  data() {
    return {
      chunks: [] as fileChunksState[],
    };
  },
  computed: {
    cubeWidth() {
      const len = this.chunks.length as number;
      return Math.ceil(Math.sqrt(len)) * 16;
    },
  },
  methods: {
    handleFileChanges(e: Event) {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        this.file = files[0];
      }
    },
    /**
     ** 更新 chunks 的进度
     */
    uploadChunksProgress(progress: number, index: number) {
      this.chunks[index]["progress"] = progress;
    },
    /**
     ** 创建文件chunks -> 实现时间切片的时候 会用到
     */
    createFileChunkofTime(file: File, size = 10 * 1024 * 1024): any[] {
      const chunks = [];
      let cur = 0;

      while (cur < file.size) {
        const fragment = { index: cur, file: file.slice(cur, cur + size) };
        chunks.push(fragment);
        cur += size;
      }

      return chunks;
    },

    //* 上传逻辑
    async upload() {
      if (!this.file) return errorMsg("先选择文件");

      //* 使用时间切面 来进行计算 文件Hash
      const calculFileHashOfTime = this.calculHashWorkOfTime(
        this.createFileChunkofTime(this.file)
      );
      //* 使用布隆过滤器的方式 来进行 文件Hash
      const calculFileHashOfBulong = this.calculHashSample(this.file);

      const fileHashNameOfTime = await calculFileHashOfTime;
      const fileHashName = await calculFileHashOfBulong;
      console.log("time=>", fileHashNameOfTime);
      console.log("布隆=>", fileHashName);

      this.chunks = this.createFileChunks(this.file, fileHashName);
      console.log("chunks=>", this.chunks);

      const req = {
        hash: fileHashName,
        exp: this.file.name.split(".").pop() || "",
      };
      console.log("req=>", req);

      const { uploadList, uploaded } = await this.checkoption(req);

      if (uploaded) {
        return successMsg("秒传 成功");
      }

      //* 修改进度条
      this.chunks = this.chunks.map((chunk) => {
        return {
          ...chunk,
          progress: uploadList.includes(chunk.name) ? 100 : 0,
        };
      });
      const queue = this.integrationChunks(uploadList, this.chunks);
      console.log("queue=>", queue);
      await this.sendRequest(queue, this.chunks, this.uploadChunksProgress);
      console.log("全部请求成功 - 通知合并文件");
      await this.mergeFileRequest(this.file, fileHashName);
    },
  },
});
</script>

<style scoped lang="scss">
#drag {
  height: 100px;
  border: 2px dashed #eee;
  text-align: center;
  vertical-align: middles;
}
.hash-progress-style {
  margin-top: 30px;

  .processStyle {
    margin-top: 30px;
  }
}

.cube-container {
  margin-top: 30px;
  .cube {
    width: 14px;
    height: 14px;
    line-height: 12px;
    border: 1px solid black;
    background: #eee;
    float: left;
    > .success {
      background-color: green;
    }
    > .loading {
      background-color: blue;
    }
    > .error {
      background-color: red;
    }
  }
}
</style>

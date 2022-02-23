<template>
  <div class="write-btn">
  </div>
  <el-row>
    <el-col :span='12'>
      <!-- markdown编辑器的基本操作 -->
      <textarea ref="editor"
                class="md-editor"
                :value="content"
                @input="update"></textarea>
    </el-col>
    <el-col :span='12'>
      <div class="markdown-body"
           v-html="compiledContent"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atelier-cave-light.css";
// import javascript from "highlight.js/lib/languages/javascript";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      content: `# 开课吧${String(Math.random()).slice(2, 6)}
* 上课
* 吃饭
* 写代码

\`\`\`javascript
  let a =1;
  console.log(a)
\`\`\`
      `,
      timmer: null,
      marked: marked,
    };
  },
  computed: {
    compiledContent() {
      return marked.parse(this.content);
    },
  },
  mounted() {
    this.timmer = null;
    this.bindEvent();
    marked.setOptions({
      rendered: new marked.Renderer(),
      highlight(code: string, lang: any) {
        // return hljs.highlightAuto(code).value;
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-",
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });

    marked.parse(this.content, (err, html) => {
      console.log(html);
    });
  },
  methods: {
    submit() {
      console.log("submit");
    },
    update(e: Event) {
      clearTimeout(this.timmer);
      this.timmer = setTimeout(() => {
        this.content = (e.target as HTMLInputElement).value;
      }, 350);
    },
    bindEvent() {
      (this.$refs as any).editor.addEventListener(
        "paste",
        async (e: ClipboardEvent) => {
          const files = e.clipboardData?.files;
          console.log("files-paste=>", files);
        }
      );
      (this.$refs as any).editor.addEventListener("drop", (e: DragEvent) => {
        const files = e.dataTransfer?.files;
        console.log("drop=>", files);
        e.preventDefault();
      });
    },
  },
});
</script>

<style scoped>
.markdown-body pre {
  /* background:#23241f; */
  /* color:#f92672; */
}
.md-editor {
  width: 100%;
  height: calc(100vh - 84px);
  outline: none;
}
.write-btn {
  position: fixed;
  z-index: 100;
  right: 30px;
  top: 94px;
}
</style>
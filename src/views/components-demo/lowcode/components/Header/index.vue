<template>
  <el-row class="header">
    <el-col :span="6"
            class="flex items-center">
    </el-col>
    <!-- 🍌 中间 -->
    <el-col :span="15"
            class="flex items-center">
      <template v-for="(tool,index) in tools"
                :key="index">
        <div class="divide">
          <div class="tool-item items-center cursor-pointer"
            @click="tool.onClick"
          >
            <div class="iconStyle">
              <svg-icon icon-class="email" />
            </div>
            <div class="title"> {{tool.title}} </div>
          </div>
        </div>
      </template>
    </el-col>
    <!--  中间 🍌 -->
    <el-col :span="3"
            class="right-tools items-center">
      <el-tooltip class="item"
                  effect="dark"
                  content="运行"
                  placement="bottom">
        <el-button type="primary"
                   size="large"
                   circle
                   class="flex-shrink-0 !p-6px"
                   @click="runPreview">
          <svg-icon icon-class="email"
                    style="color: #fff" />
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTools } from "./hooks/tools";

export default defineComponent({
  setup() {
    const tools = useTools();
    return { tools };
  },
  methods: {
    runPreview() {
      console.log("runPreview=>");
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  .tool-item {
    .title {
      margin-top: 4px;
      font-size: 12px;
      flex: auto 0 0;
      text-align: center;
    }
  }
  .right-tools {
    justify-content: flex-end;
  }
  .right-tools > * {
    margin-left: 8px;
  }
}
.items-center {
  justify-content: center;
}

.flex {
  display: flex;
}
.divide {
  flex: auto;
}
.iconStyle {
  color: yellowgreen;
  text-align: center;
}
</style>
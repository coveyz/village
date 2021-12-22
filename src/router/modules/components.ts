import { RouteRecordRaw } from "vue-router";
import BasicLayout from "@/layout/base-layout/index.vue";


const componentsRoutes: RouteRecordRaw = {
  path: "/components",
  component: BasicLayout,
  meta: {
    title: "组件",
    limit: "components",
    icon: "tools",
  },
  children: [
    {
      path: "file",
      component: () => import("@/views/components-demo/file/index.vue"),
      name: "UploadFile",
      meta: { title: "上传文件", limit: "components", icon: "" },
    },
    {
      path: 'process',
      component: () => import('@/views/components-demo/process/index.vue'),
      name: 'Process',
      meta: { title: '流程图', limit: 'components', icon: '' }
    },
  ],
};

export default componentsRoutes;

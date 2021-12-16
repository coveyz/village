import { RouteRecordRaw } from "vue-router";
import BasicLayout from "@/layout/user-layout/index.vue";


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
  ],
};

export default componentsRoutes;

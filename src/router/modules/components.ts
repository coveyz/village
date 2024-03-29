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
  redirect: 'noredirect',
  children: [
    {
      path: 'lowcode',
      component: () => import('@/views/components-demo/lowcode/index.vue'),
      name: 'lowcode',
      meta: { title: 'lowcode', limit: 'components', icon: '' }
    },
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
      meta: { title: '流程图', limit: 'components', icon: '', }
    },
    {
      path: 'record',
      component: () => import('@/views/components-demo/record/index.vue'),
      name: 'Record',
      meta: { title: '录屏', limit: 'components', icon: '' }
    },
    {
      path: 'perception',
      component: () => import('@/views/components-demo/perception/index.vue'),
      name: 'Perception',
      meta: { title: '方向感知', limit: 'components', icon: '' }
    },
    {
      path: 'search',
      component: () => import('@/views/components-demo/search/index.vue'),
      name: 'Search',
      meta: { title: '搜索框', limit: 'components', icon: '' }
    },
    {
      path: 'operations',
      component: () => import('@/views/components-demo/operations/index.vue'),
      name: 'Operation',
      meta: { title: '操作组', limit: 'components', icon: '' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top/index.vue'),
      name: 'Editor',
      meta: { title: 'back-to-top', limit: 'components', icon: '' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/drag-kanban/index.vue'),
      name: 'kanban',
      meta: { title: '拖拽看板', limit: 'components', icon: '' }
    },
    {
      path: 'clipboard',
      component: () => import('@/views/components-demo/clipboard/index.vue'),
      name: 'clipboard',
      meta: { title: '粘贴板', limit: 'components', icon: '' }
    },
    {
      path: 'list',
      component: () => import('@/views/components-demo/list/index.vue'),
      name: 'list',
      meta: { title: '列表', limit: 'components', icon: '' }
    },
    {
      path: 'watermark',
      component: () => import('@/views/components-demo/watermark/index.vue'),
      name: 'watermark',
      meta: { title: '水印', limit: 'components', icon: '' }
    },
    {
      path: 'change-theme',
      component: () => import('@/views/components-demo/theme/index.vue'),
      name: 'theme',
      meta: { title: '主题', limit: 'components', icon: '' }
    },

  ],
};

export default componentsRoutes;

import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterScrollBehavior,
} from "vue-router";
import UserLayout from "@/layout/user-layout/index.vue";
import BaseLayout from "@/layout/base-layout/index.vue";

import componentsRoutes from './modules/components'


//* 常规 路由
export const constantsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    component: () => UserLayout,
    redirect: "/user/login",
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/user/login",
        component: () => import("@/views/login/index.vue"),
        meta: { hidden: true },
      },
      {
        path: "/user/register",
        component: () => import("@/views/register/index.vue"),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: '/',
    component: BaseLayout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '导航',
        icon: 'dashboard',
        affix: true
      }
    }]
  }
];

//* 异步 路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  componentsRoutes,
  {
    path: '/404',
    component: () => import('@/views/error-page/404/index.vue'),
    meta: { hidden: true }
  }
];

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { left: 0, top: 0 };
  }
};

const routerFactory = () =>
  createRouter({
    scrollBehavior: scrollBehavior,
    history: createWebHashHistory(),
    routes: constantsRoutes,
  });

const router = routerFactory();

export const resetRoutes = () => {
  const newRouter = routerFactory();
  (router as any).matcher = (newRouter as any).matcher;
};

export default router;

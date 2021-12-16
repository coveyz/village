import { Module, Store as VuexStore } from "vuex";
import { PermissionState } from "@/store/type";
import { RootState } from "@/store";
import { RouteRecordRaw } from "vue-router";
import { constantsRoutes, asyncRoutes } from "@/router";

export type PermissionStore<S = PermissionState> = Omit<VuexStore<S>, "">;

const hasPermission = (
  route: RouteRecordRaw,
  permission: string[]
): boolean => {
  if (route.meta && route.meta.limit) {
    return permission.includes(route.meta.limit as string);
  } else {
    return true;
  }
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], permission: string[]) => {
  const res: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(tmp, permission)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permission);
      }
      res.push(tmp);
    }
  });

  return res;
};

const state: PermissionState = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES(state: PermissionState, routes: RouteRecordRaw[]) {
    state.addRoutes = routes;
    state.routes = constantsRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }: any, permissionList: string[]) {
    console.log('generateRoutes=>')
    return new Promise((resolve) => {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, permissionList);
      commit("SET_ROUTES", accessRoutes);
      resolve(accessRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<PermissionState, RootState>;

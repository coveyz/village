import { createStore } from "vuex";
import getters from "./getters";
import { UserState, PermissionState, SettingState, AppState } from "./type";
import { UserStore } from "./modules/user";
import { PermissionStore } from "./modules/permission";

const modulesFiles = require.context("./modules", false, /\.(js|ts)$/);
const modules = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});


export interface RootState {
  user: UserState;
  permission: PermissionState;
  setting: SettingState;
  app: AppState;
}

export type Store = UserStore<Pick<RootState, "user">> &
  PermissionStore<Pick<RootState, "permission">>;

export const store = createStore({
  getters,
  modules,
});

export const useStore = (): Store => {
  return store as Store;
};

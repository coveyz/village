import { RouteRecordRaw } from 'vue-router'

export type UserState = {
  token: string,
  permission_list: string[]
}

export type PermissionState = {
  routes: RouteRecordRaw[],
  addRoutes: RouteRecordRaw[]
}

export type SettingState = {
  theme: string,
  showSetting: boolean,
  tagsView: boolean,
  fixedHeader: boolean,
  sidebarLogo: boolean,
}

export type AppState = {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: string,
}
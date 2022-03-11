import { Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store'
import { SettingState } from '@/store/type'
import defaultSetting from '@/setting'

const { showSetting, tagsView, fixedHeader, sidebarLogo } = defaultSetting

export type SettingStore<S = SettingState> = Omit<VuexStore<S>, ''>

const state: SettingState = {
  theme: '', //todo
  showSetting: showSetting,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
}

type defaultKey = "theme" | "showSetting" | "tagsView" | 'fixedHeader' | "sidebarLogo"


const mutations = {
  //todo state 类型 有问题
  CHANGE_SETTING: (state: any, data: { key: defaultKey, value: string | boolean }) => {
    const { key, value } = data
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }: any, data: { key: string, value: string | boolean }) {
    commit('CHANGE_SETTING', data)
  }
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<SettingState, RootState>


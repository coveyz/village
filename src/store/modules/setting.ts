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

const mutations = {

}

const actions = {


}

export default {
  namespace: true,
  state,
  mutations,
  actions
} as Module<SettingState, RootState>


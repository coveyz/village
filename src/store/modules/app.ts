import { Module, Store as VuexStore } from "vuex";
import { RootState } from '@/store'
import { AppState } from '@/store/type'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'

export type AppStore<S = AppState> = Omit<VuexStore<S>, ''>

const state: AppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR(state: AppState) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false

    if (state.sidebar.withoutAnimation) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    console.log('action,toggleSideBar')
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state, mutations, actions
} as Module<AppState, RootState>
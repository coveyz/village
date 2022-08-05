

import { Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store'
import { AppState } from '@/store/type'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'
import Cookies from 'js-cookie'

export type AppStore<S = AppState> = Omit<VuexStore<S>, ''>

const state: AppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR(state: AppState) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  SET_SIZE(state: AppState,size: string) {
    state.size = size
    Cookies.set('size',size)
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    console.log('action,toggleSideBar')
    commit('TOGGLE_SIDEBAR')
  },
  setSize({ commit }: any, size: string) {
    commit('SET_SIZE',size)
  }
}

export default {
  namespaced: true,
  state, mutations, actions
} as Module<AppState, RootState>
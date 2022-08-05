import { Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store'
import { TagsViewState } from '@/store/type'

export type TagsViewStore<S = TagsViewState> = Omit<VuexStore<S>, ''>

const state: TagsViewState = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  DEL_ALL_CACHED_VIEWS(state: TagsViewState) {
    state.cachedViews = []
  }
}
const actions = {
  delAllCachedViews({ commit }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  }
}

export default {
  namespaced: true,
  state, mutations, actions
} as Module<TagsViewState, RootState>
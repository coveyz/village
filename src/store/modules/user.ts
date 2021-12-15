import md5 from 'md5'
import { UserState } from '@/store/type'
import { Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store'

import { LoginData } from '@/api/user/type'
import { loginUser } from '@/api/user'

import { setToken } from '@/utils/auth'

export type UserStore<S = UserState> = Omit<VuexStore<S>, ''>

const state: UserState = {
  token: '',
  permission_list: []
}

const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token
  },
  SET_PERMISSION(state: UserState, list: string[]) {
    state.permission_list = list
  }
}

const actions = {
  //* 登录
  login({ commit }: any, payload: LoginData) {
    return new Promise<void>((resolve, reject) => {
      const requestData: LoginData = Object.assign({}, payload);
      requestData["passwd"] = md5(requestData["passwd"]);
      loginUser(requestData).then((res) => {
        const { token } = res.data.data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<UserState, RootState>
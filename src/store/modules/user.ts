import md5 from "md5";
import { UserState } from "@/store/type";
import { Module, Store as VuexStore } from "vuex";
import { RootState } from "@/store";

import { LoginData } from "@/api/user/type";
import { loginUser, permissionList } from "@/api/user";

import { setToken, removeToken, getToken } from "@/utils/auth";
import { errorMsg } from "@/utils/box";

export type UserStore<S = UserState> = Omit<VuexStore<S>, "">;

const state: UserState = {
  token: getToken() || '',
  permission_list: [],
};

const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token;
  },
  SET_PERMISSION(state: UserState, list: string[]) {
    state.permission_list = list;
  },
};

const actions = {
  //* 登录
  login({ commit }: any, payload: LoginData) {
    return new Promise<void>((resolve, reject) => {
      const requestData: LoginData = Object.assign({}, payload);
      requestData["passwd"] = md5(requestData["passwd"]);
      loginUser(requestData)
        .then((res) => {
          const { token } = res.data.data;
          commit("SET_TOKEN", token);
          setToken(token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getPermissionList({ commit }: any) {
    return new Promise((resolve, reject) => {
      permissionList()
        .then((res) => {
          const { data } = res;
          if (!data) {
            errorMsg("验证失败，请重新登录。");
            reject("验证失败，请重新登录。");
          }
          const permission_list = data.data;
          if (!permission_list || permission_list.length <= 0) {
            errorMsg("当前凭证无任何权限,请联系管理员配置权限");
            reject("当前凭证无任何权限,请联系管理员配置权限");
          }
          commit("SET_PERMISSION", permission_list);
          resolve(permission_list);
        })
        .catch((error) => {
          console.log('user->catch=>', error)
          // errorMsg(error.message || "验证失败，请重新登录");
          reject(error.message || "验证失败，请重新登录");
        });
    });
  },
  resetToken() {
    console.log('清空token')
    removeToken();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<UserState, RootState>;

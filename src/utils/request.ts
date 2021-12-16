import axios from "axios";
import { errorMsg } from "@/utils/box";
import { getToken } from '@/utils/auth'
import { useStore } from '@/store'

const http = axios.create({
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    const store = useStore()
    if (store.getters.token) {
      (config.headers as any)['Authorization'] = 'Bearer ' + getToken()
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      errorMsg(res.message);
      return Promise.reject(new Error(res.message || "Error"));
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

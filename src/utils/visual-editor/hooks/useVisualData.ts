import { reactive } from 'vue';
import { CacheEnum } from '../enums'
import type { InjectionKey } from 'vue'

// 保存到本地数据的 Key
export const localKey = CacheEnum.DATA_KEY;

// 注入JSONDATA的 key
export const injectKey: InjectionKey<ReturnType<typeof initVisualData>> = Symbol()

export const createNewPage = ({ title = "新页面", path = "/" }) => ({
  title, path,
  config: {
    bgColor: "",
    bgImage: "",
    keepAlive: false
  },
  blocks: []
})
const defaultVaule = {
  pages: { '/': createNewPage({ title: '首页' }) },

}


export const initVisualData = () => {
  const localData = JSON.parse(sessionStorage.getItem(localKey) as string);

}

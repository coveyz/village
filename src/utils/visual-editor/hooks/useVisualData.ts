import { reactive, watch, computed, readonly } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CacheEnum } from '../enums'
import type { InjectionKey } from 'vue'
import { ModelValueType, IState, BlockData } from '../types/utils'

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
const defaultVaule: ModelValueType = {
  // pages: { '/': createNewPage({ title: '首页' }) },
  pages: { '/components/lowcode': createNewPage({ title: '低代码' }) },
  models: [],
  actions: []
}


export const initVisualData = () => {
  const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
  const jsonData: ModelValueType = Object.keys(localData?.pages || {}).length ? localData : defaultVaule

  const route = useRoute()
  const router = useRouter()

  // 所有页面的 path 都必须与 / 开发
  const getPrefixPath = (path: string) => (path.startsWith('/') ? path : `/${path}`)
  const currentPage = jsonData.pages[route.path]

  const state: IState = reactive({
    jsonData,
    currentPage,
    currentBlock: currentPage?.blocks?.find((item) => item.focus) ?? ({} as BlockData),
  })

  const paths = Object.keys(jsonData.pages), isExistPath = paths.some((path) => route.path === path)

  // 如果当前页面不存在
  if (!isExistPath) {
    console.error('todo=>', '当前页面不存在')
  }

  watch(() => route.path, (url) => {
    console.log('todo->setCurrent', url)
  })
  // 更新 page
  const updatePage = () => {
    console.log('todo=> updatePage')
  }
  //设置 当前页面
  const setCurrentPage = () => {
    console.log('todo setCurrentPage')
  }

  const deletePage = () => {
    console.log('delete deletePage')
  }

  return {
    jsonData: readonly(state.jsonData), // 保护JSONData避免直接修改
    currentPage: computed(() => state.currentPage),
    currentBlock: computed(() => state.currentBlock),
    updatePage,
    setCurrentPage,
    deletePage
  }
}


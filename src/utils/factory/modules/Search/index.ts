import { isEmptyObject } from "@/utils/box";
import { itemErrorTips } from "@/utils/factory/tools";
import { defaultConfig } from "@/utils/factory/default";
import template from "./default";

//* search项 内部错误
const SearchItemErrorItps = itemErrorTips('search')

const judge = (data: any, index: number): boolean => {
  if (isEmptyObject(data)) return SearchItemErrorItps(index, '不能是空对象')

  const keys = defaultConfig['search']['keys'] || []

  let flage = true
  for (const key of keys) {
    if (!(key in data)) {
      SearchItemErrorItps(index, `不能没有${key}字段`)
      flage = false
    }
    if (data[key] === '') {
      SearchItemErrorItps(index, `${key}字段不得为空`)
      // flage = false
    }
  }
  return flage
}
/**
 ** Search 类型 入口
 */
export const gate = (searchConfig: any) => {
  const products: any[] = []
  for (let index = 0; index < searchConfig.length; index++) {
    const machining = searchConfig[index];
    judge(machining, index) && products.push(packing(machining))
  }
  return products
}

const packing = (material: any) => {
  const productTemplate = { ...template['default'], ...template[material['type']] }

  return { ...productTemplate, ...material }
}
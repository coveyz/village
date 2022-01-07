import { isEmptyObject } from "@/utils/box";
import { itemErrorTips } from "@/utils/factory/tools";
import template from "./default";
import { defaultConfig } from "@/utils/factory/default";

//* options 内部错误
const OperationItemErrorItps = itemErrorTips('operations')

const judge = (data: any, index: number, keys = defaultConfig['operations']['keys'] || []): boolean => {
  if (isEmptyObject(data)) return OperationItemErrorItps(index, '不能是空对象')

  let flage = true

  for (const key of keys) {
    //* 基础判断 ->
    if (!(key in data)) {
      OperationItemErrorItps(index, `不能没有${key}字段`)
      flage = false
    }
    if (data[key] === '') {
      OperationItemErrorItps(index, `${key}字段不得为空`)
      flage = false
    }
    //* 特殊判断 -> button 情况 第一层的name 需要判断 ， dropdownButton-> name 不要判断
    if (data['buttonType'] === 'button' && data.name === '') {
      OperationItemErrorItps(index, `name字段不得为空`)
      flage = false
    }
    //* dropdownButton -> options 下拉的内容 该判断 还是需要判断的
    if (data['buttonType'] === 'dropdownButton') {
      if (Array.isArray(data['options'])) {
        const arr = data['options']
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          judge(element, index, ['name'])
        }
      } else {
        OperationItemErrorItps(index, `options字段需要是数组`)
        return false

      }
    }

  }
  return flage

}

export const gate = (operationsInfo: any) => {
  console.log('operationsInfo=>', operationsInfo)
  const products: any[] = []
  for (let index = 0; index < operationsInfo.length; index++) {
    const machining = operationsInfo[index];
    judge(machining, index) && products.push(packing(machining))
  }
  return products
}

const packing = (material: any) => {
  const productTemplate = { ...template['default'], ...template[material['type']] }

  return { ...productTemplate, ...material }
}
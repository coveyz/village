import { defaultConfig } from "./default"
import { readyUnpacking } from "./tools"

import { SearchGate, OperationGroupGate } from "./modules"

export const gate = (config: any, type?: string) => {
  if (typeof config !== 'object') {
    console.error('配置文件 类型不合法')
    return
  }
  if (type) {
    console.log('传送门=>', type)
    return
  }
  //todo 如果 config 传进来是数组
  if (Array.isArray(config)) {
    const commodities: any[] = []
    return commodities
  }
  //* 如果 是对象的话 
  else {
    return workShop(config)
  }
}

//* 操作车间
const workShop = (config: any) => {
  const item = assemblyLine(config)
  const product = mergeData(item)
  return product
}

//* 流水线
const assemblyLine = (config: any) => {
  const product = {}
  for (const key in config) {
    switch (key) {
      case 'search':
        product[key] = readyUnpacking(config[key], key) ? SearchGate(config[key]) : []
        break;
      case 'operations':
        product[key] = readyUnpacking(config[key], key) ? OperationGroupGate(config[key]) : []
        break
      case 'index':
        product[key] = readyUnpacking(config[key], key, 'Number') ? config[key] : 1
        break
      default:
        break;
    }
  }
  return product
}

//* 合并配置文件 合并 用户没有设置的文件
const mergeData = (config: any) => {
  for (const key in defaultConfig) {
    if (!(key in config)) {
      config[key] = defaultConfig[key].value
    }
  }
  return config
}


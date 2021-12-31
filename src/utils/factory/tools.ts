const itemTypeErrorTips = (key: string, valType: string, type: string) => {
  console.error(`配置文件中${key} 应该是${type}类型 而不是${valType}类型`)
  return false
}

/**
 ** 判断 当前配置文件项 是不是规定的 配置类型
 */
export const readyUnpacking = (val: any, key: string, type = "Array"): boolean => {
  const valType = Object.prototype.toString.call(val).slice(8, -1)
  if (valType !== type) return itemTypeErrorTips(key, valType, type)
  return val === '' || val.length === 0
}

/**
 ** 配置项 错误提示
 */
// export const itemErrorTips = (type: string, index: number, info?: string) => {
//   console.error(`配置文件中${type} 第${index + 1}有问题 ${info}`)
//   return false
// }
export const itemErrorTips = (type = '配置项') => (index: number, info?: string) => {
  console.error(`配置文件中${type} 第${index + 1}有问题 ${info}`)
  return false
}
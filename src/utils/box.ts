import { ElNotification } from "element-plus";
/**
 ** 成功提示语
 * @param msg
 * @param title
 * @returns
 */
export const successMsg = (msg: string, title = "成功") => {
  return ElNotification({
    title: title,
    message: msg,
    type: "success",
  });
};
/**
 ** 失败提示语
 * @param msg
 * @param title
 * @returns
 */
export const errorMsg = (msg: string, title = "错误") => {
  return ElNotification({
    title: title,
    message: msg,
    type: "error",
  });
};

const defaultTitle = "village";
export const getPageTitle = (pageTitle: string): string => {
  return pageTitle ? pageTitle : defaultTitle;
};

/**
 ** 判断当前是否是空对象
 * @param object
 * @returns boolean
 */
export const isEmptyObject = (object: any): boolean => {
  for (const key in object) {
    return false;
  }
  return true;
};

/**
 ** 判断当前是否是 excel文件
 * @param file
 */
export const isExcel = (file: File) => {
  return /\.(xlsx|xls|csv)$/.test(file.name);
};

/**
 ** 整合 请求选项数据
 */
export type IntegrationDataState = Record<string, any[]>
export const integrationSelectData = (arr: IntegrationDataState[]): IntegrationDataState => {
  return arr.reduce((acc: IntegrationDataState, cur: IntegrationDataState) => {
    for (const key in cur) {
      acc[key] = cur[key]
    }
    return acc
  }, {})
}
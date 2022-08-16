type EditorTableOption = {
  options: {
    label: string; // 列显示文本
    field: string; // 列绑定的字段
  }[];
  showKey: string;
}

type EditorSelectOptions = {
  label: string;
  value: string | number | boolean | object;
  [prop: string]: any;
}[]

export enum EditorPropsType {
  /** 输入框 */
  input = 'input',
  /** 数字输入框 */
  inputNumber = 'InputNumber',
  /** 颜色选择器 */
  color = 'color',
  /** 下拉选择器 */
  select = 'select',
  /** 表格 */
  table = 'table',
  /** 开关 */
  switch = 'switch',
  /** 模型绑定选择器 */
  modelBind = 'ModelBind',
  /** 可拖拽项 */
  crossSortable = 'CrossSortable',
}

export type EditorProps = {
  type: EditorPropsType
  /** 表单项标签名称 */
  label: string;
  /** 表单项提示说明 */
  tips?: string;
  /** 表单域标签的位置 */
  labelPosition?: string;
  /** 表单项默认值 */
  defaultValue?: any;
} & {
  /** 可选项 */
  options?: EditorSelectOptions;
} & {
  max?: number;
  min?: number;
} & {
  table?: EditorTableOption;
};
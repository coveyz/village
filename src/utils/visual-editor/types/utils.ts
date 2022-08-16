import type { CSSProperties } from 'vue'
import { EditorProps } from './props'

/**
 * @desription 组建属性
 */
export type BlockData = {
  /** 组建id 时间戳 组建唯一标识 */
  _vid: string
  /** 组建所属模块 （基础组建 容器组建） */
  moduleName: keyof ComponentModules
  /** 映射 VisualEditorConfig 中 componentMap 的 component对象 */
  componentKey: string;
  /** 组件标签名称 */
  label: string;
  /** 是否需要调整位置 */
  adjustPosition: boolean;
  /** 当前是否为选中状态 */
  focus: boolean;
  /** 当前组件的样式 */
  styles: CSSProperties & {
    tempPadding?: string;
  };
  /** 是否调整过宽度或者高度 */
  hasResize: boolean;
  /** 组件的设计属性 */
  props: Record<string, any>;
  /** 绑定的字段 */
  model: Record<string, string>;
  /** 组件是否可以被拖拽 */
  draggable: boolean;
  /** 是否显示组件样式配置项 */
  showStyleConfig?: boolean;
}


/** 
 * @description 单个组件注册规则 
*/
type EditorComponent = {
  /** 组件name */
  key: string;
  /** 组件所属模块名称 */
  moduleName: keyof ComponentModules;
  /** 组件唯一id */
  _vid?: string;
  /** 组件中文名称 */
  label: string;
  /** 组件预览函数 */
  preview: () => JSX.Element;
  /** 组件渲染函数 */
  render: (data: {
    props: any;
    model: any;
    // styles: CSSProperties;
    block: BlockData;
    custom: Record<string, any>;
  }) => () => JSX.Element;
  /** 组件是否可以被拖拽 */
  draggable?: boolean;
  /** 是否显示组件的样式配置项 */
  showStyleConfig?: boolean;
  /** 组件属性 */
  props?: Record<string, EditorProps>;
  /** 组件事件集合 */
  events?: { label: string; value: string }[];
  /** 组件样式 */
  styles?: CSSProperties;
}

/**
 * @description 组建模块
 */
type ComponentModules = {
  baseWidgets: EditorComponent[]; // 基础组件
  containerComponents: EditorComponent[]; // 容器组件
}

/**
 * @description 页面配置
 */
type PageConfig = {
  /** 背景颜色 */
  bgColor: string,
  /** 背景图片 */
  bgImage: string,
  /** 是否保活动 */
  keepAlive: boolean
}


type EditorPage = {
  /** 页面名称 */
  title: string;
  /** 页面地址 */
  path: string;
  /** 404是否重定向到默认页面 */
  isDefault?: boolean;
  /** 页面配置 */
  config: PageConfig;
  /** 当前页面的组建 */
  blocks: BlockData[]
}

/** 可以认为是 路由=>页面 */
type EditorPages = {
  [path: string]: EditorPage
}

export type ModelValueType = {
  /** 页面 */
  pages: EditorPages,
  /** 实体 */
  models: any[], //todo
  /** 动作 */
  actions: any // todo
}
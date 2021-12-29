//* Search -> config 必须给有的 项
export type SearchRequireState = {
  name: string,
  type: string
  value: string | any[] | number
}
//* Search -> config 默认的项
export type SearchDefaultState = {
  title?: string,
  show?: boolean,
  level?: 'special' | 'ordinary',
  limit?: string,
  width?: number,
}
//* Search -> 类型
type SearchState = SearchRequireState & SearchDefaultState

//* Search -> 长度限制的字段
export type SearchInputMaxLength = {
  maxlength?: number
}

//* Search -> select option 类型
export type OptionsState = {
  label: string,
  value: string,
  disabled?: boolean
}

//* Search -> select select 类型
type SelectItemState = {
  option: string | OptionsState[],
  isEvent?: boolean
}

type DaterangItemState = {
  startName: string,
  startValue: string,
  endName: string,
  endValue: string
}


export type SearchItemOfInput = SearchState & SearchInputMaxLength
export type SeatchItemOfSelect = SearchState & SelectItemState
export type SearchItemOfDate = SearchState
export type SearchItemOfDaterange = SearchState & DaterangItemState

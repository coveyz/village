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

export type SearchInputMaxLength = {
  maxlength?: number
}

export type OptionsState = {
  label: string,
  value: string,
  disabled?: boolean
}

type SelectItemState = {
  option: string | OptionsState[],
  isEvent?: boolean
}


export type SearchItemOfInput = SearchState & SearchInputMaxLength

export type SeatchItemOfSelect = SearchState & SelectItemState

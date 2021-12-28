export type SearchRequireState = {
  name: string,
  type: string
}

export type SearchDefaultState = {
  title: string,
  show?: boolean,
  level?: 'special' | 'ordinary',
  limit?: string,
  width: number,
  value: string | any[]
}

export type SearchInputMaxLength = {
  maxlength?: number
}


export type SearchItemOfInput = SearchRequireState & SearchDefaultState & SearchInputMaxLength



type DefaultConfigKey = "search" | "operations" | "table" | 'tableOptions' | "select" | "url" | "index"
type DefaultConfigValue = {
  value: any[] | number | string | boolean
  keys?: string[]
}

type DefaultConfigState = Record<DefaultConfigKey, DefaultConfigValue>

export const defaultConfig: DefaultConfigState = {
  search: {
    keys: ['name', 'type'],
    value: []
  },
  operations: {
    value: [],
    keys: ['buttonType',], //* buttonType === 'dropdownButton' 父级可以没有name
  },
  table: { value: [] },
  tableOptions: { value: [] },
  select: { value: true },
  url: { value: '' },
  index: { value: '0' }
}
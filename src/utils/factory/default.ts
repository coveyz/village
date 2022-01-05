type DefaultConfigKey = "search" | 'searchOptions' | "options" | "table" | 'tableOptions' | "select" | "url" | "index"
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
  searchOptions: {
    keys: ['name', 'type'],
    value: []
  },
  options: { value: [] },
  table: { value: [] },
  tableOptions: { value: [] },
  select: { value: true },
  url: { value: '' },
  index: { value: '0' }
}
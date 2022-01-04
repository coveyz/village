type SelectOptionState = {
  label: string,
  value: string,
  disabled?: boolean
}
type templateState = {
  init: {
    name: string,
    type: string
  },
  default: {
    title: string,
    name: string,
    width: number | string,
    level: 'ordinary' | 'special',
    show: boolean
  },
  input: {
    value: string,
    maxlength: number
  },
  select: {
    value: string
    option: string | Array<SelectOptionState>
    isEvent: false
  },
  date: {
    value: string
  },
  daterange: {
    value: Array<string>
    startName: string
    startValue: string
    endName: string
    endValue: string
  },
  tree: {
    value: string,
    label: string
    option: Array<SelectOptionState & { children: Array<SelectOptionState> }>
  }
}

type SearchTemplateState = Omit<templateState, 'init'>

const template: SearchTemplateState = {
  default: {
    title: '',
    name: '',
    width: 300,
    level: 'ordinary',
    show: true
  },
  input: {
    value: '',
    maxlength: 20
  },
  select: {
    value: '',
    option: [],
    isEvent: false
  },
  date: {
    value: ''
  },
  daterange: {
    value: [],
    startName: '',
    startValue: '',
    endName: '',
    endValue: '',
  },
  tree: {
    value: '',
    label: '',
    option: []
  }
}


export default template
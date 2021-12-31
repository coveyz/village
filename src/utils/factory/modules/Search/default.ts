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
  }
}


export default template
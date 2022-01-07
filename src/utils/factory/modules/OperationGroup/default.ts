type OptionState = {
  title: string,
  name: string
}

type templateState = {
  default: {
    type: string,
    title: string,
    icon: string,
    special: boolean
  },
  button: {
    buttonType: string
  },
  dropdownButton: {
    buttonType: string
    options: Array<OptionState>
  }
}

const template: templateState = {
  default: {
    type: 'primary',
    title: '',
    icon: '',
    special: false
  },
  button: {
    buttonType: "button",
  },
  dropdownButton: {
    buttonType: "dropdownButton",
    options: []
  }
}

export default template
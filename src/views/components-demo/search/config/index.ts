const data = {
  search: [
    {
      type: 'input',
      title: '输入项',
      name: 'inputItem',
      value: '',
      width: 300,
      level: 'ordinary',
      show: true,
      maxlength: 20
    },
    {
      name: 'xx',
      type: 'select',
      title: '下拉框',
      option: 'xxx',
      level: 'ordinary',
      show: true,
      isEvent: true,
    },
    {
      name: 'xx2',
      type: 'select',
      title: '下拉框2',
      value: '',
      option: [{
        value: "Option12",
        label: "Option122",
      },
      {
        value: "Option2222",
        label: "Option2222",
        disabled: true,
      },
      {
        value: "Option32222",
        label: "Option32222",
        disabled: true,
      },
      {
        value: "Option42222",
        label: "Option42222",
      },
      {
        value: "Option52222",
        label: "Option52222",
      },],
      show: true,
      level: 'special',
    },
    {
      name: 'dateItem',
      type: 'date',
      title: '日期输入',
      value: '',
      show: true,
      level: 'special'
    },
    {
      name: 'daterangeItem',
      type: 'daterange',
      title: '日期输入',
      value: [],
      show: true,
      level: 'special',
      startName: 'startName',
      startValue: '',
      endName: 'endName',
      endValue: ''
    }
  ]
}

export default data
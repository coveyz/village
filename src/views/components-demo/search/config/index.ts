import { factory } from "@/utils/box"


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
      type: 'input',
      name: 'inputTestItem',
      title: '输入factory'
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
    // {
    //   name: 'dateItem',
    //   type: 'date',
    //   title: '日期输入',
    //   value: '',
    //   show: true,
    //   level: 'special'
    // },
    // {
    //   name: 'treeItem',
    //   type: 'tree',
    //   title: '树状选择',
    //   value: '',
    //   show: true,
    //   level: 'special',
    //   label: '',
    //   option: [
    //     {
    //       label: "Level one 1",
    //       id: 'Level one 1',
    //       children: [
    //         {
    //           label: "Level two 1-1",
    //           id: "Level two 1-1",
    //           children: [
    //             {
    //               label: "Level three 1-1-1",
    //               id: "Level three 1-1-1",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Level one 2",
    //       id: "Level one 2",
    //       children: [
    //         {
    //           label: "Level two 2-1",
    //           id: "Level two 2-1",
    //           children: [
    //             {
    //               label: "Level three 2-1-1",
    //               id: "Level three 2-1-1",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Level one 3",
    //       id: "Level one 3",
    //       children: [
    //         {
    //           label: "Level two 3-1",
    //           id: "Level two 3-1",
    //           children: [
    //             {
    //               label: "Level three 3-1-1",
    //               id: "Level three 3-1-1",
    //             },
    //           ],
    //         },
    //         {
    //           label: "Level two 3-2",
    //           id: "Level two 3-2",
    //           children: [
    //             {
    //               label: "Level three 3-2-1",
    //               id: "Level three 3-2-1",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ]
    // },
    // {
    //   name: 'treeItem2',
    //   type: 'tree',
    //   title: '树状选择2',
    //   value: '',
    //   show: true,
    //   level: 'special',
    //   label: '',
    //   option: 'treeItem2'
    // },


    // {
    //   name: 'daterangeItem',
    //   type: 'daterange',
    //   title: '日期输入',
    //   value: [],
    //   show: true,
    //   level: 'special',
    //   startName: 'startName',
    //   startValue: '',
    //   endName: 'endName',
    //   endValue: '',
    //   width: 500
    // },

  ]
}
export default factory(data)
const data = {
  operations: [
    {
      type: "warning", // 类型 样式
      buttonType: "button",
      title: "批量导入", // 文字
      name: "Import", // 键 区别操作
      icon: "", // 图标
      special: false // 特殊类型  不进行 选中个数的判断
    }, {
      type: "warning", // 类型 样式
      buttonType: "dropdownButton",
      title: "导出呈批单", // 文字
      options: [
        {
          title: "呈批单(红色)",
          name: ""
        }, {
          title: "呈批单(黑色)",
          name: ""
        }
      ],
      name: "", // 键 区别操作
      icon: "", // 图标
      special: false // 特殊类型  不进行 选中个数的判断
    },
  ]
}

export default data

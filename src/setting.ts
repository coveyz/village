type SettingType = {
  showSetting: boolean,
  tagsView: boolean, //* 覆盖默认标题
  fixedHeader: boolean, //* 控制设置面板显示 
  sidebarLogo: boolean, //* 是否在侧边栏中显示徽标
  errorLog: string //* env将启用errorlog组件，默认值仅为“生产”
}

const setting: SettingType = {
  showSetting: false,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: false,
  errorLog: 'production'
}

export default setting
import { createApp, Directive } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";

import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
import "@/styles/element-variables.scss"


import router from "@/router";
import { store } from "@/store";
import * as directive from '@/directive'

//* 公共样式
import "@/styles/index.scss";

//* Icon
import "@/icons";
import SvgIcon from "@/components/SvgIcon/index.vue";

//* 全局权限
import "./permission";
import Cookies from "js-cookie";


const app = createApp(App);
app.component("svg-icon", SvgIcon);

Object.keys(directive).forEach(key => {
  app.directive(key, (directive as { [key: string]: Directive })[key])
})

app.use(router).use(store).use(ElementPlus, {
  size: store.state.app.size || 'medium'
}).mount("#app");

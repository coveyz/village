import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "@/router";
import {store} from "@/store";

//* 公共样式
import "@/styles/index.scss";

//* Icon
import "@/icons";
import SvgIcon from "@/components/SvgIcon/index.vue";

const app = createApp(App);

app.component("svg-icon", SvgIcon);

app.use(router).use(store).use(ElementPlus).mount("#app");

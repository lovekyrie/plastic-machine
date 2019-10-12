import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";

import "babel-polyfill"; // 解决 IE11 Promise对象未定义
import { until, reg } from "./until";

import { Query } from "./query";
import { api } from "./api";

export default {
  install(Vue) {
    Vue.use(ElementUI);
    // Vue.use(FileSaver)
    // Vue.prototype.axios = axios;
    Vue.prototype.api = new api();
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
    Vue.prototype.Query = Query;
  }
};

import Vue from "vue";
import App from "../src/views/login.vue";
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#login");

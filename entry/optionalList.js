import Vue from "vue";
import App from "../src/views/optionalList.vue";
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#optionalList");

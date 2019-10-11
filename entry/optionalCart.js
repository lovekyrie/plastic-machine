import Vue from "vue";
import App from "../src/views/optionalCart.vue";
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#optionalCart");

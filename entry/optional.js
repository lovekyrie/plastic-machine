import Vue from "vue";
import App from "../src/views/optional.vue";
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#optional");

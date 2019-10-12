import Vue from "vue";
import App from "../src/views/navigation.vue";
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#navigation");

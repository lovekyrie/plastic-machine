import Vue from "vue";
import App from "../src/views/home.vue";

Vue.config.productionTip = false;

import init from "../src/assets/js/init";
Vue.use(init);

new Vue({
  render: h => h(App)
}).$mount("#home");

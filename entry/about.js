import Vue from "vue";
import App from "../src/views/about.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#about");

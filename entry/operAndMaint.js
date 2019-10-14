import Vue from "vue";
import App from "../src/views/operAndMaint.vue";

import init from "../src/assets/js/init";
Vue.use(init);
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount("#operAndMaint");

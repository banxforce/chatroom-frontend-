import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";
import "element-ui/lib/theme-chalk/index.css";
import router from "@/router";
import store from "@/store";
import "./mock/index.js";

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount("#app");

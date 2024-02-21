import Vue from "vue";
import Vuex from "vuex";
// import * as getters from './getters.js'

Vue.use(Vuex);

/** 状态定义 */
export const state = {
   loading: false,
   themeObj: 0, //主题
   keywords: "", //关键词
   baseURL: "http://localhost:8080/",
   chatPrefix: "CHAT:", // 聊天存储前缀
};

export default new Vuex.Store({
   state: state,
});

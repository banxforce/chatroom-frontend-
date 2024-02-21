import VueRouter from "vue-router";

// 路由配置
const routes = [
   {
      path: "/",
      redirect: "/login",
   },
   {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login"),
   },
   {
      path: "/home",
      name: "Home",
      component: () => import("@/views/home"),
   },
];

//路由实例
const router = new VueRouter({
    routes,
    mode: "history"
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
   if(to.path != from.path){
      next()
   }
})

export default router
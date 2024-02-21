<template>
   <div class="home">
      <el-container height="100%">
         <el-aside width="100px">
            <!-- 最左侧功能栏 -->
            <Nav></Nav>
         </el-aside>
         <el-main>
            <Main></Main>
            <!-- <ChatHome /> -->
         </el-main>
      </el-container>
   </div>
</template>

<script>
import Nav from "@/components/content/Nav.vue";
import Main from "./Main.vue";

import { connect, disconnect } from "@/api/websocket";
import { getToken } from "@/utils/auth";

export default {
   name: "App",
   components: {
      Nav,
      Main,

   },
   computed: {
      token() {
         return getToken();
      },
   },
   created() {
      if (this.token) {
         connect();
      }
   },
   destroyed() {
      // 断开websocket连接
      disconnect();
   },
   watch: {
      token(val, oldVal) {
         //如果一开始没有，现在有了，说明刚登录，连接websocket
         if (!oldVal && val) {
            connect()
         }
         //如果原先有，现在没有了，说明退出登录，断开websocket
         if (oldVal && !val) {
            disconnect()
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.home {
   width: 90vw;
   height: 90vh;
   background-color: rgb(39, 42, 55);
   border-radius: 15px;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
}
</style>

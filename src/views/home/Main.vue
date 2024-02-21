<template>
   <div class="chatHome">
      <div class="chatLeft">
         <div class="title">
            <h1>大猫聊天室</h1>
         </div>
         <!-- title: 子组件参数，标题 -->
         <OnlineUsers title="聊天列表" :personList="personList" @clickPerson="clickPerson" />
      </div>
      <div class="chatRight">
         <div v-if="showChatWindow">
            <ChatWindow :friendInfo="friendInfo" @personCardSort="personCardSort"></ChatWindow>
         </div>
         <!-- 未选择聊天人时默认显示 -->
         <div class="showIcon" v-else>
            <span class="iconfont icon-snapchat"></span>
            <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
         </div>
      </div>
   </div>
</template>

<script>
import PersonCard from "@/components/common/PersonCard.vue";
import ChatWindow from "@/views/home/ChatWindow.vue";
import OnlineUsers from "@/components/content/OnlineUsers.vue";

import eventBus from "@/utils/evenBus";

import { onlineUsers } from "@/api/user";

export default {
   name: "App",
   components: {
      PersonCard,
      ChatWindow,
      OnlineUsers,
   },
   data() {
      return {
         personList: [],
         showChatWindow: false,
         friendInfo: {},
      };
   },
   created() {
      // 自己上线时主动触发一次初始化操作
      this.initUsers();
      // 监听用户上下级事件
      eventBus.$on("link", this.initUsers);
   },
   methods: {
      clickPerson(info) {
         this.showChatWindow = true;
         this.friendInfo = info;
      },
      // 根据id进行排序，example: id=2, 1 2 3 -> 2 1 3
      personCardSort(id) {
         if (id !== this.personList[0].id) {
            console.log(id);
            let nowPersonInfo;
            for (let i = 0; i < this.personList.length; i++) {
               if (this.personList[i].id == id) {
                  nowPersonInfo = this.personList[i];
                  this.personList.splice(i, 1);
                  break;
               }
            }
            this.personList.unshift(nowPersonInfo);
         }
      },
      // 初始化在线列表
      initUsers(data) {
         console.log("initUsers被调用了");
         // 获取userId
         const userId = JSON.parse(localStorage.getItem("userInfo")).id;
         // 参数对象
         const query = { id: userId };
         onlineUsers(query)
            .then((res) => (this.personList = res))
            .catch((err) => {});
      },
   },
};
</script>

<style lang="scss" scoped>
.chatHome {
   // margin-top: 20px;
   display: flex;

   .chatLeft {
      width: 280px;

      .title {
         color: #fff;
         padding-left: 10px;
      }

      .online-person {
         margin-top: 100px;

         .onlin-text {
            padding-left: 10px;
            color: rgb(176, 178, 189);
         }

         .person-cards-wrapper {
            padding-left: 10px;
            height: 65vh;
            margin-top: 20px;
            overflow: hidden;
            overflow-y: scroll;
            box-sizing: border-box;

            &::-webkit-scrollbar {
               width: 0;
               /* Safari,Chrome 隐藏滚动条 */
               height: 0;
               /* Safari,Chrome 隐藏滚动条 */
               display: none;
               /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
         }
      }
   }

   .chatRight {
      flex: 1;
      padding-right: 30px;

      .showIcon {
         position: absolute;
         top: calc(50% - 150px);
         /*垂直居中 */
         left: calc(50% - 50px);

         /*水平居中 */
         .icon-snapchat {
            width: 300px;
            height: 300px;
            font-size: 300px;
            // color: rgb(28, 30, 44);
         }
      }
   }
}
</style>

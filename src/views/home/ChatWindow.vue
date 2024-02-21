<template>
   <div class="chat-window">
      <!-- 顶栏 -->
      <div class="top">
         <!-- 聊天对象信息 -->
         <div class="head-pic">
            <HeadPortrait :imgUrl="friendInfo.avatar"></HeadPortrait>
         </div>
         <div class="info-detail">
            <div class="name">{{ friendInfo.nickName }}</div>
            <div class="detail">{{ friendInfo.description }}</div>
         </div>
         <!-- 其他功能 -->
         <div class="other-fun">
            <span class="iconfont icon-shipin" @click="video"> </span>
            <span class="iconfont icon-gf-telephone" @click="telephone"></span>
            <label for="docFile">
               <span class="iconfont icon-wenjian"></span>
            </label>
            <label for="imgFile">
               <span class="iconfont icon-tupian"></span>
            </label>
            <input type="file" name="" id="imgFile" @change="sendImg" accept="image/*" />
            <input type="file" name="" id="docFile" @change="sendFile" accept="application/*,text/*" />
            <!-- accept="application/*" -->
         </div>
      </div>
      <div class="bottom">
         <!-- 聊天内容 -->
         <div class="chat-content" ref="chatContent">
            <ChatWrapper :chat-list="chatList" :selfInfo="selfInfo" />
         </div>
         <!-- 发送栏 -->
         <div class="chatInputs">
            <div class="emoji boxinput" @click="clickEmoji">
               <img src="@/assets/img/emoji/smiling-face.png" alt="" />
            </div>
            <div class="emoji-content">
               <Emoji v-show="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
            </div>
            <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
            <div class="send boxinput" @click="sendText">
               <img src="@/assets/img/emoji/rocket.png" alt="" />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { animation } from "@/utils/util";
import { getCurrentTime } from "@/utils/format"
import { getArray, pushArray } from "@/utils/localStorage"
import { privateSubscription, sendMsg } from "@/api/websocket"

import eventBus from "@/utils/evenBus";

import HeadPortrait from "@/components/common/HeadPortrait";
import Emoji from "@/components//common/Emoji";
import ChatWrapper from "@/components/common/ChatWrapper.vue";

export default {
   components: {
      HeadPortrait,
      Emoji,
      ChatWrapper,
   },
   props: {
      friendInfo: Object,
      default() {
         return {};
      },
   },
   //  TODO, 监听器逻辑
   watch: {
      toUsername() {
         this.getChatRecord();
      },
   },
   data() {
      return {
         chatList: [],
         inputMsg: "",
         showEmoji: false,
         srcImgList: [],
      };
   },
   mounted() {
      // 获取聊天记录
      this.getChatRecord();
      // 订阅目标
      privateSubscription(this.fromUsername)
      // 事件处理
      eventBus.$on("singleShout", body => {
         body = JSON.parse(body)

         const fromUsername = body.fromUsername
         const chatMsg = body.chatMsg
         // 聊天记录本地存储
         pushArray(this.storeKey, chatMsg)
         // 是否是当前聊天对象
         if (this.toUsername === fromUsername) {
            this.chatList.push(chatMsg);
         }
      })
   },
   computed: {
      selfInfo() {
         return JSON.parse(localStorage.getItem("userInfo"))
      },
      id() {
         return this.selfInfo.id;
      },
      toUsername() {
         return this.friendInfo.userName
      },
      fromUsername() {
         return this.selfInfo.userName
      },
      storeKey() {
         return this.$store.state.chatPrefix + this.fromUsername + ':' + this.toUsername
      }
   },
   methods: {
      //获取聊天记录
      getFriendChatMsg() {
         let params = {
            friendId: this.friendInfo.id,
         };
         // 请求已被移除
         getChatMsg(params).then((res) => {
            this.chatList = res;
            this.chatList.forEach((item) => {
               if (item.chatType == 2 && item.extend.imgType == 2) {
                  this.srcImgList.push(item.msg);
               }
            });
            this.scrollBottom();
         });
      },
      // 获取聊天记录
      getChatRecord() {
         this.chatList = getArray(this.storeKey)
         // 滚动至底部
         this.scrollBottom();
      },
      //发送信息
      sendMsg(chatMsg) {
         // 发送到服务端
         sendMsg(this.toUsername, this.fromUsername, chatMsg)
         // 本地存储
         pushArray(this.storeKey, chatMsg)
         this.chatList.push(chatMsg);
         this.scrollBottom();
      },
      //获取窗口高度并滚动至最底层
      scrollBottom() {
         this.$nextTick(() => {
            const scrollDom = this.$refs.chatContent;
            animation(
               scrollDom,
               scrollDom.scrollHeight - scrollDom.offsetHeight
            );
         });
      },
      //关闭标签框
      clickEmoji() {
         this.showEmoji = !this.showEmoji;
      },
      //发送文字信息
      sendText() {
         if (this.inputMsg) {
            let chatMsg = {
               avatar: this.selfInfo.avatar,
               nickName: this.selfInfo.nickName,
               time: getCurrentTime(),
               msg: this.inputMsg,
               chatType: 0, //信息类型，0文字，1图片
               id: this.id, //uid
            };
            this.sendMsg(chatMsg);
            // 置于首位
            this.$emit("personCardSort", this.friendInfo.id);
            this.inputMsg = "";
         } else {
            this.$message({
               message: "消息不能为空哦~",
               type: "warning",
            });
         }
      },
      //发送表情
      sendEmoji(msg) {
         let chatMsg = {
            avatar: this.selfInfo.avatar,
            nickName: this.selfInfo.nickName,
            time: getCurrentTime(),
            msg: msg,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
               imgType: 1, //(1表情，2本地图片)
            },
            id: this.id, //uid
         };
         this.sendMsg(chatMsg);
         this.clickEmoji();
      },
      //发送本地图片
      sendImg(e) {
         let _this = this;
         console.log(e.target.files);
         let chatMsg = {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "",
            chatType: 1, //信息类型，0文字，1图片, 2文件
            extend: {
               imgType: 2, //(1表情，2本地图片)
            },
            uid: "1001",
         };
         let files = e.target.files[0]; //图片文件名
         if (!e || !window.FileReader) return; // 看是否支持FileReader
         let reader = new FileReader();
         reader.readAsDataURL(files); // 关键一步，在这里转换的
         reader.onloadend = function () {
            chatMsg.msg = this.result; //赋值
            _this.srcImgList.push(chatMsg.msg);
         };
         this.sendMsg(chatMsg);
         e.target.files = null;
      },
      //发送文件
      sendFile(e) {
         let chatMsg = {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "",
            chatType: 2, //信息类型，0文字，1图片, 2文件
            extend: {
               fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
            },
            uid: "1001",
         };
         let files = e.target.files[0]; //图片文件名
         chatMsg.msg = files;
         console.log(files);
         if (files) {
            switch (files.type) {
               case "application/msword":
               case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  chatMsg.extend.fileType = 1;
                  break;
               case "application/vnd.ms-excel":
               case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  chatMsg.extend.fileType = 2;
                  break;
               case "application/vnd.ms-powerpoint":
               case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                  chatMsg.extend.fileType = 3;
                  break;
               case "application/pdf":
                  chatMsg.extend.fileType = 4;
                  break;
               case "application/zip":
               case "application/x-zip-compressed":
                  chatMsg.extend.fileType = 5;
                  break;
               case "text/plain":
                  chatMsg.extend.fileType = 6;
                  break;
               default:
                  chatMsg.extend.fileType = 0;
            }
            this.sendMsg(chatMsg);
            e.target.files = null;
         }
      },
      // 发送语音
      telephone() {
         this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      },
      //发送视频
      video() {
         this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      },
   },
};
</script>

<style lang="scss" scoped>
.chat-window {
   width: 100%;
   height: 100%;
   margin-left: 20px;
   position: relative;

   .top {
      margin-bottom: 50px;

      &::after {
         content: "";
         display: block;
         clear: both;
      }

      .head-pic {
         float: left;
      }

      .info-detail {
         float: left;
         margin: 5px 20px 0;

         .name {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
         }

         .detail {
            color: #9e9e9e;
            font-size: 12px;
            margin-top: 2px;
         }
      }

      .other-fun {
         float: right;
         margin-top: 20px;

         span {
            margin-left: 30px;
            cursor: pointer;
         }

         // .icon-tupian {

         // }
         input {
            display: none;
         }
      }
   }

   .bottom {
      width: 100%;
      height: 70vh;
      background-color: rgb(50, 54, 68);
      border-radius: 20px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;

      .chat-content {
         width: 100%;
         height: 85%;
         overflow-y: scroll;
         padding: 20px;
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

      .chatInputs {
         width: 90%;
         position: absolute;
         bottom: 0;
         margin: 3%;
         display: flex;

         .boxinput {
            width: 50px;
            height: 50px;
            background-color: rgb(66, 70, 86);
            border-radius: 15px;
            border: 1px solid rgb(80, 85, 103);
            position: relative;
            cursor: pointer;

            img {
               width: 30px;
               height: 30px;
               position: absolute;
               left: 50%;
               top: 50%;
               transform: translate(-50%, -50%);
            }
         }

         .emoji {
            transition: 0.3s;

            &:hover {
               background-color: rgb(46, 49, 61);
               border: 1px solid rgb(71, 73, 82);
            }
         }

         .inputs {
            width: 90%;
            height: 50px;
            background-color: rgb(66, 70, 86);
            border-radius: 15px;
            border: 2px solid rgb(34, 135, 225);
            padding: 10px;
            box-sizing: border-box;
            transition: 0.2s;
            font-size: 20px;
            color: #fff;
            font-weight: 100;
            margin: 0 20px;

            &:focus {
               outline: none;
            }
         }

         .send {
            background-color: rgb(29, 144, 245);
            border: 0;
            transition: 0.3s;
            box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

            &:hover {
               box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
            }
         }
      }
   }
}
</style>

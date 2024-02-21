import { Client, Message } from "@stomp/stompjs";
import { getToken } from "./auth";
import eventBus from "@/utils/evenBus";

const token = getToken();
// 客户端配置
const stompConfig = {
   // 设置头部
   connectHeaders: {
      token: token,
   },

   // 代理地址
   brokerURL: "ws://localhost:8080/bx-chatroom",

   // 日志
   debug: function (str) {
      console.log("STOMP: " + str);
   },

   // 断开连接后 2000 毫秒重连
   reconnectDelay: 2000,
};

const stompClient = new Client(stompConfig);

// 当WebSocket 连接成功
stompClient.onConnect = (frame) => {
   // 用户上线广播
   stompClient.subscribe("/topic/link", (res) => {
      // 触发事件
      eventBus.$emit("link", res);
   });
   // // 一对一聊天
   // stompClient.subscribe("/user/queue/shouts", res =>{
   //    console.log("res.body的结构: ", res.body);
   //    eventBus.$emit("singleMsg", res.body);
   // })
};

// 当连接发送错误时
stompClient.onWebSocketError = (error) => {
   // 打印日志
   console.error("Error with websocket", error);
};

// 当传输出现错误时
stompClient.onStompError = (frame) => {
   // 打印日志
   console.log("Stomp连接出现错误");
};

export default stompClient;

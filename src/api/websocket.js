import stompClient from "@/utils/stompClient";
import { formatDateTime } from "@/utils/format"
import { getInfo } from "./login";
import eventBus from "@/utils/evenBus";

class Shout {
   constructor(toUsername, fromUsername, chatMsg, time) {
     this.toUsername = toUsername;
     this.fromUsername = fromUsername;
     this.chatMsg = chatMsg;
     this.time = time || new Date(); // 如果没有提供时间，就使用当前时间
   }
 }

// websocket连接
export function connect() {
   stompClient.activate();
}

// 断开连接
export function disconnect() {
   // 断开连接
   stompClient.deactivate();
}

// 发送消息
export function sendMsg(toUsername, fromUsername, chatMsg) {
   const shout = new Shout(toUsername, fromUsername, chatMsg, formatDateTime())
   stompClient.publish({
      destination: "/app/singleShout",
      body: JSON.stringify(shout),
   });
}

// 一对一聊天订阅
export function privateSubscription(toUsername){
   console.log("日志：privateSubscription被调用了");
   stompClient.subscribe(`/queue/shouts/${toUsername}`, res => {
         // 触发事件
         eventBus.$emit("singleShout", res.body);
   });
}



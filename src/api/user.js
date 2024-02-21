import request from "@/utils/request";

const prefix = "/user";

// 验证token，升级为websocket连接

// 获取在线用户信息
export function onlineUsers(query) {
   return request({
      url: prefix + "/onlineUsers",
      headers: {
         isToken: true,
      },
      method: "get",
      params: query
   });
}

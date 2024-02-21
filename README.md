# chathome

> 在线聊天室，一个前后端分离的小项目
> 
> 这里是前端
> 
> [后端仓库地址](https://github.com/banxforce/chatroom-backend)

---

## 界面

### 登录界面

<img title="" src="file:///C:/Users/banxing/Pictures/Typedown/8f2cd4c9-f535-4ce0-b3f6-503ce9675428.png" alt="8f2cd4c9-f535-4ce0-b3f6-503ce9675428" style="zoom:33%;"><img src="file:///C:/Users/banxing/Pictures/Typedown/21445dda-3440-460b-b2e0-7213a819da08.png" title="" alt="21445dda-3440-460b-b2e0-7213a819da08" style="zoom:33%;">

### 主界面

<img title="" src="file:///C:/Users/banxing/Pictures/Typedown/095de9e2-67db-4fd8-a261-1474dfcda0d0.png" alt="095de9e2-67db-4fd8-a261-1474dfcda0d0" style="zoom:25%;">

<img title="" src="file:///C:/Users/banxing/Pictures/Typedown/40cc99d8-a72c-4073-97cb-d0379e917960.png" alt="40cc99d8-a72c-4073-97cb-d0379e917960" style="zoom:25%;">

---

## 功能介绍

### 已完善

- 登录实现多用户

- Token验证，实现前后端分离

- 实时显示在线用户列表

- 支持文字、EMOJI表情聊天

- 本地存储聊天信息

- 头像昵称动态显示

### 未完善

- 支持发送本地图片以及文件，但**仅自己可见**

---

## 技术栈

- 后端
  
  - Springboot3 
  
  - mysql
  
  - redis
  
  - mybatis-plus
  
  - security6 
  
  - websocket
  
  - 

- 前端
  
  - vue2 + vuex + vue-router
  
  - mockJS
  
  - stompJs
  
  - ElementUI

---

## 启动

### 依赖安装

```
npm install
```

### 热部署-开发环境

```
npm run serve
```

### 编译-生产环境

```
npm run build
```

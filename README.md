# chathome

> 在线聊天室，一个前后端分离的小项目
> 
> 这里是前端
> 
> [后端仓库地址](https://github.com/banxforce/chatroom-backend)

---

## 界面

### 登录界面

<img title="" src="https://i.miji.bid/2024/02/29/5496266bfce76d5bbb3aa3a69c107493.png" alt="5496266bfce76d5bbb3aa3a69c107493.png" style="zoom:33%;"><img src="https://i.miji.bid/2024/02/29/e46cd8878d2531441df55ef5603d283b.md.png" title="" alt="" style="zoom:50%;">

### 主界面

<img title="" src="https://i.miji.bid/2024/02/29/bb9f7a3f209258a8fe1637cc5840de22.png" alt="095de9e2-67db-4fd8-a261-1474dfcda0d0" style="zoom:33%;">

<img title="" src="https://i.miji.bid/2024/02/29/70ae7276018ec32b5ad78b396e4a3984.png" alt="40cc99d8-a72c-4073-97cb-d0379e917960" style="zoom:33%;">

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

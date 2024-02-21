<template>
  <div class="chat-wrapper">
    <div :class="{ 'chat-me': isSelf(item.id), 'chat-friend': !isSelf(item.id) }" v-for="item in chatList" :key="item.id">
      <div class="chat-text" v-if="item.chatType == 0">
        {{ item.msg }}
      </div>
      <div class="chat-img" v-if="item.chatType == 1">
        <img :src="item.msg" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
        <el-image style="max-width: 300px; border-radius: 10px" :src="item.msg" :preview-src-list="srcImgList" v-else>
        </el-image>
      </div>
      <div class="chat-img" v-if="item.chatType == 2">
        <div class="word-file">
          <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="info-time" v-if="!isSelf(item.id)">
        <img :src="item.avatar" alt="" />
        <span>{{ item.name }}</span>
        <span>{{ item.time }}</span>
      </div>
      <div class="info-time" v-else>
        <span>{{ item.nickName }}</span>
        <span>{{ item.time }}</span>
        <img :src="item.avatar" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import FileCard from "@/components/common/FileCard.vue";

export default {
  name: "ChatWrapper",
  props: {
    chatList: Array,
    selfInfo: Object
  },
  components:{
    FileCard
  },
  data() {
    return {

    }
  },
  methods: {
    isSelf(id) {
      return this.selfInfo.id === id
    }
  }
}

</script>

<style scoped>
.chat-wrapper {
  position: relative;
  word-break: break-all;

  .chat-friend {
    width: 100%;
    float: left;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .chat-text {
      max-width: 90%;
      padding: 20px;
      border-radius: 20px 20px 20px 5px;
      background-color: rgb(56, 60, 75);
      color: #fff;

      &:hover {
        background-color: rgb(39, 42, 55);
      }
    }

    .chat-img {
      img {
        width: 100px;
        height: 100px;
      }
    }

    .info-time {
      margin: 10px 0;
      color: #fff;
      font-size: 14px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }

      span:last-child {
        color: rgb(101, 104, 115);
        margin-left: 10px;
        vertical-align: middle;
      }
    }
  }

  .chat-me {
    width: 100%;
    float: right;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .chat-text {
      float: right;
      max-width: 90%;
      padding: 20px;
      border-radius: 20px 20px 5px 20px;
      background-color: rgb(29, 144, 245);
      color: #fff;

      &:hover {
        background-color: rgb(26, 129, 219);
      }
    }

    .chat-img {
      img {
        max-width: 300px;
        max-height: 200px;
        border-radius: 10px;
      }
    }

    .info-time {
      margin: 10px 0;
      color: #fff;
      font-size: 14px;
      display: flex;
      justify-content: flex-end;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-left: 10px;
      }

      span {
        line-height: 30px;
      }

      span:first-child {
        color: rgb(101, 104, 115);
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>
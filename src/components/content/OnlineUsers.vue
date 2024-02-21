<template>
   <div class="online-person">
      <span class="onlin-text">{{ title }}</span>
      <div class="person-cards-wrapper">
         <div
            class="personList"
            v-for="personInfo in personList"
            :key="personInfo.id"
            @click="clickPerson(personInfo)"
         >
            <PersonCard
               :personInfo="personInfo"
               :pcCurrent="pcCurrent"
            ></PersonCard>
         </div>
      </div>
   </div>
</template>

<script>
import PersonCard from '@/components/common/PersonCard.vue';

export default {
   name: "ChatroomIndex",

   props:{
      title:String,
      personList:Array,
   },

   components:{
      PersonCard
   },

   data() {
      return {
         pcCurrent: -1
      };
   },

   mounted() {},

   methods: {
    clickPerson(info) {
      this.personInfo = info;
      this.pcCurrent = info.id;
      this.$emit('clickPerson', info)
    }
  },
};
</script>

<style scoped>
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
         width: 0; /* Safari,Chrome 隐藏滚动条 */
         height: 0; /* Safari,Chrome 隐藏滚动条 */
         display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
   }
}
</style>

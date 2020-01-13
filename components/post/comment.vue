<template>
  <div id="comment">
    <div class="commentInfo quanzhong">
      <img class="headImg" :src="`${$axios.defaults.baseURL+ data.account.defaultAvatar}`" alt="">
      <span class="nickname">{{data.account.nickname}}</span>
      <span class="time">{{data.created_at | disposeTime}}</span>
      <span style="float:right">#{{floor}}</span>
    </div>
    <mycomment id="newcomment" v-if="data.parent" :data="data.parent"></mycomment>

    <div class="floor">
      <div class="commentContent quanzhong">
      {{data.content}}
    </div>
    <span class="reply">回复</span>
  </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name:'mycomment',
  data () {
    return {
      floor:1
    }
  },
  filters:{
    disposeTime(time){
     return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  
  props:{
    data:{
      type: Object,
      default(){return {}}
    }
  },
  mounted () {
   
    // console.log('follow',this.data.follow)
    // console.log('data',this.data)
    // if(!this.data.parent){
    //    this.floor++
    //   //  this.$emit('commentid', this.data.follow)
    // }
   
  }
}
</script>

<style lang="less" scoped>
#newcomment{
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding:3px;
  .headImg{
    display: none;
  }
  .commentInfo.quanzhong{
    margin-bottom: 10px;
    height: 20px;
    line-height: 20px;
  }
  .commentContent.quanzhong{
    padding: 10px;
  }
}
#comment{
  border-bottom: 1px dashed #ddd;
  padding: 10px 20px;
  .commentInfo{
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #333;
    
    .headImg{
      width: 16px;
      margin:0;
      vertical-align:middle;
      border-radius: 50%;
    }
    .time{
      color: #666;
    }
  }
  .floor{
    &:hover .reply{
        display: inline;
      }
      position: relative;
      height: 50px;
    .commentContent{
      padding: 20px;
      color: #333;
      font-size: 14px;
      
    }
    .reply{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        color: blue;
        display: none;
        &:hover{
          text-decoration: underline;
        }
      }
  }
}
</style>
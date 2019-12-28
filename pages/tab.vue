<template>
  <div>
    <div class="header">
      <span
        v-for="(item,index) in ['新闻','体育','娱乐']"
        :key="index"
        style="margin:5px;"
        @click="switchtab(index)"
        :class="{active:index===current}"
      >{{item}}</span>
    </div>
    <div class="content">
      <div class="news" v-if="current === 0">
        <ul>
          <li>新闻1</li>
          <li>新闻2</li>
          <li>新闻3</li>
        </ul>
      </div>
      <div class="tiyu" v-if="current === 1">
        <ul>
          <li>体育1</li>
          <li>体育2</li>
          <li>体育3</li>
        </ul>
      </div>
      <div class="yule" v-if="current === 2">
        <ul>
          <li>娱乐1</li>
          <li>娱乐2</li>
          <li>娱乐3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        current: 0
    }
},
methods: {
    switchtab(index){
        this.current = index
    }
}
}
</script>

<style lang="less" scoped>
.active{
    color: #f00;
}
.news{
    background-color: #f00;
}
.tiyu{
    background-color: #0f0;
}
.yule{
    background-color: #00f;
}
</style>
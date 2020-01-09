<template>
  <div id="container">
    <div class="recommend">
      <div class="tablan" @mouseleave="show = false">
        <postTab :data="cityData" @getCityInfo="cityInfoshow" :show="show" />
        <div class="right" v-if="show">
          <ul>
            <li v-for="(item, index) in cityInfo" :key="index">
              <nuxt-link :to="`/post?city=${item.city}`">
                <i>{{index + 1}}</i>
                <strong>{{item.city}}</strong>
                <span>{{item.desc}}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="recommendCity">
        <p>推荐城市</p>
        <nuxt-link to="/post"><img src="../../assets/pic_sea.jpeg" alt=""></nuxt-link>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <div class="searchCity">
          <input type="text" placeholder="请输入想去的城市，如:'广州'">
          <i class="el-icon-search"></i>
        </div>
        <div class="searchRecommend">
          推荐：
          <span v-for="(item, index) in ['广州', '上海', '北京']" :key="index">{{item}}</span>
        </div>
      </div>
      <el-row class="postTitle" type="flex" justify="space-between">
          <h4>推荐攻略&nbsp;</h4>
          <el-button type="primary" icon="el-icon-edit" class="el-btn">写游记</el-button>
      </el-row>
      <div class="post">
        <postItem :data="item" v-for="(item, index) in postData" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
  import postTab from '@/components/post/postTab'
  import postSearchInput from '@/components/post/postSearchInput'
  import postItem from '@/components/post/postItem'
  export default {
    components: {
      postTab,
      postSearchInput,
      postItem
    },
    data() {
      return {
        cityData: '',
        cityInfo: [],
        show: false,
        postData: []
      }
    },
    methods: {
      cityInfoshow(cityInfo) {
        this.cityInfo = cityInfo
        this.show = true
      }
    },
    mounted() {
      this.$axios({
        url: '/posts/cities'
      }).then(res => {
        this.cityData = res.data.data
      })
      this.$axios({
        url: '/posts'
      }).then(res => {
        this.postData = res.data.data
      })
    }
  }
</script>

<style lang="less" scoped>
el-button.el-btn.el-button--primary{
  right: 0;
}
  #container {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .recommend {
      width: 260px;
      .tablan {
        position: relative;
        width: 260px;
        .right {
          position: absolute;
          left: 260px;
          top: 0;
          width: 350px;
          padding: 10px 20px;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid #ddd;
          z-index: 9;
          ul li {
            font-size: 14px;
            line-height: 36px;
            i {
              color: orange;
              font-style: italic;
              font-size: 24px;
            }
            strong {
              margin: 0 10px;
              color: orange;
              font-weight: 400;
              &:hover {
                text-decoration: underline;
              }
            }
            span {
              color: #999;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
      .recommendCity {
        p {
          padding: 20px 0 10px 0;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
        }
        img {
          width: 100%;
        }
      }
    }
    .content {
      padding-left: 40px;
      width: 700px;
      flex: 1;
      .searchCity {
        border: 3px solid orange;
        box-sizing: border-box;
        height: 40px;
        display: flex;
        input {
          width: 100%;
          line-height: 40px;
          background: none;
          padding: 0 20px;
          border: none;
          outline: none;
          flex: 1;
        }
        .el-icon-search {
          font-size: 24px;
          color: orange;
          line-height: 35px;
          margin-right: 5px;
          cursor: pointer;
          font-weight: 700;
        }
      }
      .searchRecommend {
        font-size: 12px;
        color: #666;
        margin-top: 10px;
        span {
          margin: 0 3px;
          cursor: pointer;
          &:hover {
            color: orange;
            text-decoration: underline;
          }
        }
      }
      .postTitle{
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        h4{
          font-size: 18px;
          color: orange;
          font-weight: 400;
          &::after{
            display: block;
            content: "";
            width: 72px;
            height: 2px;
            background: orange;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
</style>

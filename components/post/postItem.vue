<template>
  <div v-if="data.images.length >= 3" class="post">
      <div class="title"><h4>{{data.title}}</h4></div>
      <div class="textcontent" v-html="data.summary"></div>
      <div class="img"><div class="layoutimg" v-for="(item, index) in data.images" :key="index"><img :src="item" alt=""></div></div>
      <el-row type="flex" class="postInfo" justify="space-between">
        <div class="sendInfo">
            <span class="city"><i class="el-icon-location-outline"></i>{{data.cityName}}</span>
            <span class="account">
                by
                <img :src="`${$axios.defaults.baseURL + data.account.defaultAvatar}`" alt="">
                <span class="nickname">{{data.account.nickname}}</span>
                <span class="watch"><i class="el-icon-view"></i>{{data.watch}}</span>
            </span>
        </div>
        <span class="like">{{data.like === null? 0 : data.like}}&nbsp;赞</span>

      </el-row>
     
  </div>
  <div v-else-if="data.images.length < 3" class="post">
       <div class="min3">
            <div class="img"><div class="layoutimg" v-for="(item, index) in data.images" :key="index"><img :src="item" alt=""></div></div>

        <div class="info">
            <div class="title"><h4>{{data.title}}</h4></div>
            <div class="textcontent" v-html="data.summary"></div>
            <el-row type="flex" class="postInfo" justify="space-between">
                <div class="sendInfo">
                    <span class="city"><i class="el-icon-location-outline"></i>{{data.cityName}}</span>
                    <span class="account">
                        by
                        <img :src="`${$axios.defaults.baseURL + data.account.defaultAvatar}`" alt="">
                        <span class="nickname">{{data.account.nickname}}</span>
                        <span class="watch"><i class="el-icon-view"></i>{{data.watch}}</span>
                    </span>
                </div>
            <span class="like">{{data.like === null? 0 : data.like}}&nbsp;赞</span>

        </el-row>
        </div>
       </div>
  </div>
  <div v-else-if="data.images.length = 0" class="post">没有图片</div>
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            default:[]
        }
    },
    mounted () {
     if(this.data.images.length >= 3){
         this.data.images.splice(3)
     }
    if(this.data.images.length < 3){
         this.data.images.splice(1)
     }
     setTimeout(() => {
         console.log(this.data)
     }, 100);
    }
}
</script>

<style lang="less" scoped>
// img{
//     width: 100%;
// }
.post{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .title{
        cursor: pointer;
       h4{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 15px;
            font-weight: 400;
            font-size: 18px;
        }
        &:hover{
            color: orange;
        }
    }
    .textcontent{
        cursor: pointer;
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        color: #666;
    }
    .img{
        cursor: pointer;
        height: 150px;
        display: flex;
        .layoutimg{
            width: 220px;
            margin-right: 20px;
            img{
                  width: 220px;
                  height: 150px;
                  display: block;
                  -o-object-fit: cover;
                  object-fit: cover;
            }
        }
    }
    .postInfo{
        margin-top: 20px;
      
        .sendInfo{
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                display: flex;
                color: #999;
                i{
                    margin: 0 3px;
                }
            .account{
                display: flex;
                align-items: center;
                margin-left: 10px;
       
                img{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    margin: 0 5px; 
                    cursor: pointer;
                }
                .nickname{
                    color: orange;
                     cursor: pointer;
                }
                .watch{
                    margin-left: 10px;
                }
            }
        }
            .like{
                color: orange;
                font-size: 18px
            }
    }
    .min3{
        display: flex;
        >.img{
            width: 220px;
            height: 150px;
        }
        .info{
            margin-left: 10px;
           width: 470px;
        }
      .like{
          margin-right: 0px;
      }
    }
}
</style>
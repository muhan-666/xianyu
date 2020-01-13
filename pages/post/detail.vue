<template>
  <div id="detail">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>


    <el-row type="flex" class="row-bg" justify="space-between">
        <div class="container">
            <h2>{{postData.title}}</h2>
            <div class="postInfo">
                <p>
                    <span>发布时间：{{postData.created_at | postTime}}</span>
                    <span style="margin-left:15px">阅读：{{postData.watch}}</span>
                </p>
            </div>
            <div class="content" v-html="postData.content"></div>
            <div class="operation">
                <span class="iconfont icon-pinglun"><p>{{postData.comments && postData.comments.length}}条评论</p></span>
                <span class="iconfont icon-shoucang"><p>收藏</p></span>
                <span class="iconfont icon-fenxiang-1"><p>分享</p></span>
                <span class="iconfont icon-buoumaotubiao15"><p>已有{{postData.like}}人点赞</p></span>
            </div>
            <div class="sendcomment">
                <h3>评论</h3>
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 2, maxRows: 5}"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>

                <el-row type="flex" class="row-bg" justify="space-between" style="margin: 20px 0">
                    <div class="upload">
                        <el-upload
                        :action="`${$axios.defaults.baseURL}/upload`"
                        list-type="picture-card"
                        name="files"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>

                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>

                    <el-button size="mini" style="height:30px" type="primary">提交</el-button>
                </el-row>
                
            </div>
            <div class="comment">
                     <comment :data="item" @commentid="filtercomment" v-for="item in commentList" :key="item.id"></comment>
               
            </div>
        </div>
        <div>推荐文章</div>
    </el-row>
    
  </div>
</template>

<script>
import moment from 'moment'
import comment from '@/components/post/comment'
export default {
    components: {
      comment  
    },
    data () {
        return {
            postData:'',
            commentList:[],
            textarea:'',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        filtercomment(val){
          console.log(val)
        },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } 
    },
    filters:{
        postTime(time){
            return moment(time).format('YYYY-MM-DD hh:mm');    
        }
    },
    mounted () {
        const {id} = this.$route.query 
        this.$axios({
            url: '/posts',
            params:{id}
        }).then(res =>{
            this.postData = res.data.data[0]
            console.log(res.data.data[0] )
        })
        this.$axios({
            url: '/posts/comments',
            params:{
                post: id
            }
        }).then(res =>{
            this.commentList = res.data.data
        })
    }
}
</script>

<style lang="less" scoped>
#detail{
    width: 1000px;
    margin: 20px auto;
    .container{
        width: 700px;
        position: relative;
        /deep/img{
            max-width: 700px;
            margin: 10px 0;
        }
        h2{
            font-size: 2em;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
        }
        .postInfo{
            position: relative;
            height: 60px;
            line-height: 60px;
            p{
                position: absolute;
                right: 0;
                color: #999;
            }
        }
        .content{
            margin-bottom: 40px;
        }
        .operation{
            display: flex;
            justify-content: center;
            span{
                display: flex;
                flex-direction: column;
                cursor: pointer;
                font-size: 35px;
                margin: 0 15px;
                color: orange;
                justify-content: center;
                align-items: center;
                p{
                    font-size: 14px;
                    color: #666;
                }
            }
        }
        .comment{
            margin-top: 30px;
            border: 1px solid #ddd;
        }
        .sendcomment{
            h3{
                margin: 25px 0;
                font-weight: 400;
            }
        }
    }
}
</style>
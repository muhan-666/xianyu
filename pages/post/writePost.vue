<template>
    <div class="container">
        <el-row type="flex" class="row-bg" justify="space-between">
            <div class="main">
                <h4>发表新攻略</h4>
                <p>分享你的个人游记，让更多人看到哦！</p>
                <el-form :model="form" status-icon ref="form" class="demo-ruleForm">
                    <el-form-item>
                        <el-input type="text" v-model="form.title" auto-complete="off" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="VueEditor">
                            <VueEditor :config="config" ref="vueEditor" />
                        </div>
                    </el-form-item>
                    <el-form-item label="选择城市">
                        <el-autocomplete v-model="form.city" :fetch-suggestions="querySearchAsync" placeholder="请输入游玩的城市" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                    <el-form-item>
                        
                        <div class="setdraft">
                            <el-button type="primary" size="small" @click="sendPost">发送</el-button>
                            <span class="span">或者<span class="btn" @click="setDraft">保存到草稿箱</span></span>
                        </div>
                        <span></span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="draft">
                <div class="draft-content"> 
                    <p>草稿箱（{{draftList.length}}）</p>
                    <draftItem @getPostData="getPostData" :data="item" v-for="(item, index) in draftList" :key="index"></draftItem>
                    </div>
                </div>
        </el-row>
    </div>
</template>

<script>
import draftItem from '@/components/post/draftItem'
import moment from 'moment'
// import VueEditor from "vue-word-editor";
// import "quill/dist/quill.snow.css"
import "quill/dist/quill.snow.css"
let VueEditor;
if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
export default {
    components: {
        VueEditor,draftItem
    },
    data() {
        return {
            form: {
                    title: '',
                    city: '',
                    content:''
            },
            token:'Bearer '+ this.$store.state.user.userInfo.token,
            config: {
                    // 上传图片的配置
                    uploadImage: {
                        url: "http://192.168.102.51:1337/upload",
                        name: "files",
                        // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
                        uploadSuccess(res, insert) {
                            console.log(res)
                            insert("http://192.168.102.51:1337" + res.data[0].url)
                        }
                    },
                    // 上传视频的配置
                    uploadVideo: {
                        url: "http://192.168.102.51:1337/upload",
                        name: "files",
                        uploadSuccess(res, insert) {
                            console.log(res)
                            insert("http://192.168.102.51:1337" + res.data[0].url)
                        }
                    }
            },
            draftList:[]
        }
    },
    mounted () {
        setTimeout(() => {
            this.draftList = this.$store.state.post.draft
            
        }, 1);
    },
    methods: {
        // 获取草稿箱的数据并渲染
        getPostData(data){
            this.form.title = data.title
            this.form.city = data.city
            var quill = this.$refs.vueEditor.editor;
            
            quill.clipboard.dangerouslyPasteHTML(0, data.content);

            console.log(data)
        },
        // 保存文章到草稿箱
        setDraft(){
            var content = this.$refs.vueEditor.editor.root.innerHTML;
            this.form.content = content
            let now = new Date()
            this.form.time = moment(now).format('YYYY-MM-DD')


            this.$store.commit('post/setdraft', this.form)
            console.log(this.form)
        },
        // 发送文章
        sendPost() {
                // console.log(this.token)
                var content = this.$refs.vueEditor.editor.root.innerHTML;
                this.form.content = content

                if(!this.form.title){
                    this.$message.error('请输入标题')
                    
                    return
                }
                if(!this.form.city){
                    this.$message.error('请选择或输入正确的城市')
                    return
                }
                
               setTimeout(() => {
                    this.$axios({
                    url: '/posts',
                    method: 'post',
                    headers:{
                        'Authorization': this.token
                    },
                    data: this.form
                }).then(res =>{
                    if(res.data.message = '新增成功'){
                        this.$message.success('新增成功')
                        this.$router.push({path:'/post'})
                    }
                    console.log(res)
                }).catch(res =>{
                    console.log(res)
                })
               }, 100);
        },
        // 选中城市
        handleSelect(item) {
                this.form.city = item.name
                console.log(item);
        },
        // 输入值时触发
        async querySearchAsync(value, callback) {
                 if (!value) {
                    callback([])
                    return
                }
                const data = await this.searchCity(value, this.departCity)
                //   console.log(data)
                callback(data)
        },
        // 搜索城市
        searchCity(value, data) {
                // if (!value) {
                //     callback([])
                //     return
                // }
                // console.log(value)
                return this.$axios({
                    url: '/airs/city',
                    params: {
                        name: value
                    }
                }).then(res => {
                    // console.log(res)
                    let data = res.data.data.map(v => {
                        v.value = v.name
                        return v
                    })
                    console.log(data)
                    return data
                }).catch(res => {
                    console.log(res)
                })
        }
    }
}
</script>

<style lang="less" scoped>
    .container {
        margin: 0 auto;
        width: 1000px;
        padding: 20px 0;
        .main {
            width: 750px;
            h4 {
                font-size: 22px;
                font-weight: 400;
            }
            p {
                font-size: 12px;
                color: #999;
                margin: 10px 0;
            }
        }
        .VueEditor{
            height: 460px;
        #vue-editor-wrapper{
            height: 400px;
        }
        }
        .draft{
            width: 200px;
            display: inline-block;
            .draft-content{
                padding: 10px;
                border: 1px solid #ccc;
            }
        }
        .setdraft{
            font-size: 14px;
            .span{
                margin-left: 10px;
                .btn{
                color: orange;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
            }
        }
    }
</style>
<template>
  <el-form :model="form" ref="loginform" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
    data(){
         let checkAge = (rule, value, callback) => {
             let reg = /^1[3-9]\d{9}$/
             if(reg.test(value)){
                 callback()
             }else{
                 callback('请输入正确的手机号')
             }
      };
        return {
            // 表单数据
            form: {
                username: '',
                password: ''
            },
            // 表单规则
            rules: {
                username:[
                    {required: true, message: '用户名不能为空', trigger: 'blur'},
                    { validator: checkAge, trigger: 'blur'}
                ],
                password:[{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
           this.$refs['loginform'].validate(valid=>{
            //    this.$axios({
            //        url: '/accounts/login',
            //        method: 'post',
            //        data: this.form
            //    }).then(res =>{
                   
            //        this.$store.commit('user/setUsername',res.data)
            //     //    console.log(res.data)
            //        this.$message.success('登录成功')
            //        window.history.back()
            //    }).catch(res =>{
            //        console.log(res)
            //        this.$message.error('用户名或密码输入错误，请检查后输入。')
            //    })
            this.$store.dispatch('user/userLogin',this.form).then(res =>{
                if(res){
                   this.$message.success('登录成功')
                   window.history.back()
                }
            })
            
           })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>

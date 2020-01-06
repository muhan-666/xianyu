<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username" ref="usertel">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
              <el-button @click="handleSendCaptcha" :disabled="disabled">{{captchatext}}</el-button>
</template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password2">
      <el-input placeholder="确认密码" type="password" v-model="form.password2"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
  export default {
    data() {
      const usernamereg = (rule, value, callback) => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback('手机号码格式不正确')
        }
      };
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback('请再次输入密码');
        } else if (value !== this.form.password) {
          callback('两次输入密码不一致!');
        } else {
          callback();
        }
      };
      return {
        disabled: false,
        captchatext: '发送验证码',
        // 表单数据
        form: {
          username: '',
          captcha: '',
          nickname: '',
          password: '',
          password2: ''
          
        },
        
        // 表单规则
        rules: {
          username: [{
              required: true,
              message: '手机号码不能为空',
              trigger: 'blur'
            },
            {
              validator: usernamereg,
              trigger: 'blur'
            }
          ],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }],
          nickname: [{
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }],
          password2:[
            {
              validator: validatePass2,
              trigger: 'blur'
            }
          ]
        },
        captcha: '',
        tel: ''
      }
    },
    methods: {
      // 发送验证码
      handleSendCaptcha() {
        let hm = 60;
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/


        if(reg.test(this.form.username)){
          this.$store.dispatch('user/sendcaptcha', this.form.username).then(res => {
            if (res) {
              const dingshiqi = setInterval(() => {
                hm--
                this.captchatext = hm
                if(hm === 0){
                  clearInterval(dingshiqi)
                  this.disabled = false
                   this.captchatext = '获取验证码'
                }
              }, 1000);
              this.disabled = true
              this.captcha = res.captcha
              this.tel = res.tel
              this.$alert('测试验证码为：'+res.captcha)
            }
          })
        }else{
          this.$message.error('请输入合法的手机号码')
        }
        // this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // this.$axios({
        //   url: '/captchas',
        //   method: 'post',
        //   data: {tel:this.form.username}
        // }).then(res =>{
        //   console.log(res)
        //   this.captcha = res.data.code
        //   this.tell = res.data.tel
        // }).catch(res =>{
        //   console.log(res)
        // })
      },
      // 注册
      handleRegSubmit() {
        // console.log(this.form)
        const newform ={ ...this.form}
        delete newform.password2
        this.$refs.form.validate(valid =>{
          if(valid){
 this.$axios({
           url: '/accounts/register',
           method: 'post',
           data: newform
         }).then(res =>{
           this.$store.commit('user/setUsername',res.data)
           this.$message.success('注册成功')
           this.$router.back()
         }).catch(res =>{
           console.log(res)
         })
          }
        })
        
      }
    }
  }
</script>

<style scoped lang="less">
  .form {
    padding: 25px;
  }
  .form-item {
    margin-bottom: 20px;
  }
  .form-text {
    font-size: 12px;
    color: #409EFF;
    text-align: right;
    line-height: 1;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
</style>
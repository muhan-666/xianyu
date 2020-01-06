// 获取已经设置好的属性
export const state = ({
    userInfo: {},
    totalPrice: 0,
    history: []
})

export const mutations = {
    setUsername(state, data) {
        state.userInfo = data
    },
    setTotalPrice(state, data){
        state.totalPrice = data
    },
    sethistory(state, data){
        if(state.history.length < 5){
            state.history.push(data)
        }else{
            state.history.shift()
        }
    }
}

export const actions = {
    //用户登录
    userLogin(store, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'post',
            data
        }).then(res => {

            store.commit('setUsername', res.data)
            //console.log(res.data)
            return true
        }).catch(res => {
            console.log(res)
            return false
            // obj.catch()
        })
    },
    // 发送验证码
    sendcaptcha(store, data) {
        // this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return this.$axios({
          url: '/captchas',
          method: 'post',
          data: {tel:data}
        }).then(res =>{
            return {
                captcha: res.data.code,
                tel: res.data.tel
            }
        //   this.captcha = res.data.code
        //   this.tell = res.data.tel
        //   return true
        }).catch(res =>{
          console.log(res)
          return false
        })
    }
}
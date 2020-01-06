<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info" v-for="(item, index) in orderDetail.users" :key="index">
                <div class="member-info-item">
                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <span class="delete-user" @click="handleDeleteUser(index)" v-if="index>0">-</span>
                </div>
            </el-form>
            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>
        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
                    <el-checkbox :label='`${item.type}：￥${item.price}/份×1最高赔付${item.compensation}`' border @change="chooseInsurance(item.id)">
                    </el-checkbox>
                </div>
            </div>
        </div>
        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="orderDetail.contactName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="orderDetail.contactPhone">
                            <template slot="append">
                                    <el-button @click="handleSendCaptcha">发送验证码</el-button>
</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="orderDetail.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        {{totalPrice}}
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                orderDetail: {
                    users: [{
                        username: '',
                        id: ''
                    }],
                    insurances: [],
                    contactName: '',
                    contactPhone: '',
                    captcha: '',
                    invoice: false,
                    seat_xid: this.$route.query.seat_xid,
                    air: this.$route.query.id
                }
            }
        },
        computed: {
            totalPrice() {
                let price = 0
                if (!this.data.seat_infos) return ''
                // 燃油费
                price += this.data.airport_tax_audlet
                // 机票单价
                price += this.data.seat_infos.settle_price
                // 保险
                price += this.orderDetail.insurances.length * 30;
                // 乘机人数
                price *= this.orderDetail.users.length;
                this.$store.commit('user/setTotalPrice', price)
                return ''
            }
        },
        mounted() {
            setTimeout(() => {
                console.log(this.data)
            }, 5);
        },
        methods: {
            // 添加乘机人
            handleAddUsers() {
                this.orderDetail.users.push({
                    username: '',
                    id: ''
                })
            },
            // 移除乘机人
            handleDeleteUser(index) {
                this.orderDetail.users.splice(index, 1)
            },
            // 发送手机验证码
            handleSendCaptcha() {
                // console.log(this.orderDetail.contactPhone)
                // if (!this.orderDetail.contactPhone) return
                this.$store.dispatch('user/sendcaptcha', this.orderDetail.contactPhone).then(res => {
                    this.$alert(`当前测试验证码为：${res.captcha}`, '验证码')
                })
            },
            // 提交订单
            handleSubmit() {
                this.$axios({
                    url: '/airorders',
                    method: 'post',
                    data: this.orderDetail,
                    headers: {
                        Authorization: "Bearer " + this.$store.state.user.userInfo.token
                    }
                }).then(res => {

                    const id = res.data.data.id
                    this.$router.push({
                        path: 'pay',
                        query:{id}
                    })
                })
            },
            chooseInsurance(id) {
                const index = this.orderDetail.insurances.indexOf(id)
                // console.log()
                if (index === -1) {
                    this.orderDetail.insurances.push(id)
                } else {
                    this.orderDetail.insurances.splice(index, 1)
                }
                // console.log(id)
                // console.log(this.orderDetail.insurances)
            }
        }
    }
</script>

<style scoped lang="less">
    .air-column {
        border-bottom: 1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .air-column h2 {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }
    /deep/ .el-select .el-input {
        width: 130px;
    }
    .input-with-select {
        width: 590px;
    }
    .input-with-select /deep/ .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item {
        margin-bottom: 0;
    }
    .member-info-item {
        border-bottom: 1px #eee dashed;
        padding-bottom: 20px;
        position: relative;
    }
    .add-member {
        margin-top: 20px;
    }
    .delete-user {
        display: block;
        background: #ddd;
        width: 16px;
        height: 16px;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 50px;
        position: absolute;
        right: -30px;
        top: 50%;
    }
    .insurance {
        >div {
            margin-top: 10px;
        }
    }
    .insurance-item {
        margin-bottom: 20px;
    }
    .contact {
        /deep/ .el-input {
            width: 50%;
        }
    }
    .submit {
        margin: 50px auto;
        display: block;
        width: 250px;
        height: 50px;
    }
</style>
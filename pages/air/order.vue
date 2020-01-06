<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <orderForm :data="airData"/>
            </div>
            <!-- 侧边栏 -->
            <div class="aside">
                <orderAside :data="airData"/>
            </div>
        </el-row>
    </div>
</template>

<script>
    import orderForm from '@/components/air/orderForm.vue'
    import orderAside from '@/components/air/orderAside.vue'
    export default {
        data () {
            return {
                airData:{}
            }
        },
        components: {
            orderForm,
            orderAside
        },
        mounted() {
            const {id, seat_xid} = this.$route.query
            this.$axios({
                url: '/airs/'+id,
                params:{seat_xid}
            }).then(res => {
                // console.log(res)
               this.airData = res.data
            })
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 1000px;
        margin: 20px auto;
    }
    /*aside*/
    .aside {
        width: 350px;
        height: fit-content;
        border: 1px #ddd solid;
    }
</style>
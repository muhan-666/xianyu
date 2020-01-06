<template>
    <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <flightsFilters :data="flightsData" @setDataList='setDataList' />
                <div>
                </div>
                <!-- 航班头部布局 -->
                <div>
                    <flightsListHead/>
                </div>
                <!-- 航班信息 -->
                <div>
                    <flightsItem v-for="(item,index) in flightsList1" :key="index" :data="item" />
                </div>
            </div>
            <!-- 侧边栏 -->
            <div class="aside">
                <flightsAside/>
            </div>
        </el-row>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- {{flightsList1}} -->
    </section>
</template>

<script>
    import moment from "moment";
    import flightsListHead from '@/components/air/flightsListHead.vue'
    import flightsItem from '@/components/air/flightsItem.vue'
    import flightsFilters from '@/components/air/flightsFilters.vue'
    import flightsAside from '@/components/air/flightsAside.vue'
    export default {
        data() {
            return {
                flightsList: [],
                pageSize: 5,
                total: 0,
                pageIndex: 1,
                flightsData: {
                    info: {},
                    options: {}
                }
            }
        },
        components: {
            flightsListHead,
            flightsItem,
            flightsFilters,
            flightsAside
        },
        mounted() {
            this.$axios({
                url: '/airs',
                params: this.$route.query
            }).then(res => {
                // console.log(res.data.flights)
                this.total = res.data.total
                this.flightsList = res.data.flights
                this.flightsData = res.data
                // console.log(this.flightsData)
            })
            // console.log(this.$route.query)
        },
        computed: {
            flightsList1() {
                if (!this.flightsList) return []
                // console.log(this.flightsList)
                return this.flightsList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
            }
        },
        watch: {
            $route() {
                
                this.$axios({
                    url: '/airs',
                    params: this.$route.query
                }).then(res => {
                    // console.log(res.data.flights)
                    this.total = res.data.total
                    this.flightsList = res.data.flights
                    this.flightsData = res.data
                     this.pageIndex = 1
                    // console.log(this.flightsData)
            })
            }
        },
        methods: {
            handleSizeChange(value) {
                this.pageSize = value
                // this.total = this.flightsList.length
            },
            handleCurrentChange(value) {
                this.pageIndex = value
                // this.total = this.flightsList.length
            },
            setDataList(arr) {
                //    const newArr = arr.slice((this.pageIndex - 1) * this.pageSize,this.pageIndex * this.pageSize)
                this.total = arr.length
                if (arr.length === 0) {
                    this.$message.error('没有数据了哦~')
                }
                this.flightsList = arr
                // console.log(arr)
                // console.log(value)
            }
        }
    }
</script>

<style scoped lang="less">
    .contianer {
        width: 1000px;
        margin: 20px auto;
    }
    .flights-content {
        width: 745px;
        font-size: 14px;
    }
    .aside {
        width: 240px;
    }
</style>
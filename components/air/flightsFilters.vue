<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： {{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option :label="item" :value="item" v-for="(item,index) in data.options.airport" :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option :label="`${item.from}:00 - ${item.to}:00`" :value="`${item.from},${item.to}`" v-for="(item,index) in data.options.flightTimes" :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
                    <el-option :label="item" :value="item" v-for="(item,index) in data.options.company" :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option :label="item" :value="index" v-for="(item,index) in airSizeList" :key="index">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">
                撤销
            </el-button>
        </div>
        {{filterFlight}}
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
                airport: "", // 机场
                flightTimes: "", // 出发时间
                company: "", // 航空公司
                airSize: "", // 机型大小
                airSizeList: {
                    L: '大',
                    M: '中',
                    S: '小'
                }
            }
        },
        computed: {
            filterFlight() {
                if (!this.data.flights) return
                // console.log(this.data.flights)
                const arr = this.data.flights.filter(item => {
                    let valid = true
                    if (this.company && item.airline_name !== this.company) {
                        valid = false
                    }
                    if (this.flightTimes) {
                        const [from, to] = this.flightTimes.split(',')
                        const start = +item.dep_time.split(':')[0]
                        if (start < from || start >= to) {
                            valid = false
                        }
                    }
                    if (this.airSize && this.airSize !== item.plane_size) {
                        valid = false
                    }
                    if (this.airport && this.airport !== item.airport) {
                        valid = false
                    }
                    return valid
                })
                this.$emit('setDataList', arr)
                // console.log(arr)
                return ''
            }
        },
        methods: {
            // 选择机场时候触发
            handleAirport(value) {
                // this.$emit('setDataList', value)
            },
            // 选择出发时间时候触发
            handleFlightTimes(value) {
                // console.log(this.data.flights)
            },
            // 选择航空公司时候触发
            handleCompany(value) {},
            // 选择机型时候触发
            handleAirSize(value) {},
            // 撤销条件时候触发
            handleFiltersCancel() {
                this.airport = "" // 机场
                this.flightTimes = "" // 出发时间
                this.company = "" // 航空公司
                this.airSize = "" // 机型大小
            },
        },
        mounted() {
            //    setTimeout(() => {
            // console.log(this.data)
            //    }, 1000);
        }
    }
</script>

<style scoped lang="less">
    .filters {
        margin-bottom: 20px;
    }
    .filters-top {
        >div {
            /deep/ .el-select {
                margin-left: 10px;
            }
        }
    }
    .filter-cancel {
        margin-top: 10px;
    }
</style>
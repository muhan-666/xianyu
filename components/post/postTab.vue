<template>
    <div class="tab">
        {{class1}}
        <div class="left" ref="div">
            <div class="left-son" :class="{active: index === current}" v-for="(item, index) in data" :key="index" @mouseover="leftHandleOver(index)" ><span>{{item.type}}</span></div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props:['data','show'],
        data () {
            return {
                cityInfo:{},
                current: ''
            }
        },
        computed: {
            class1(){
                if(!this.show){
                    this.current = ''
                }
            }
        },
        mounted () {
            // setTimeout(() => {
            //     console.log(this.data)
            // }, 1);
            // console.dir(this.$refs.div)
        },
        methods: {
            leftHandleOver(index){
                this.current = index
                this.cityInfo = this.data[index].children

                this.$emit('getCityInfo', this.cityInfo)
            }
        }
    }
</script>

<style lang="less" scoped>

     .tab {
        position: absolute;
        width: 100%;
        height: 100%;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
         .left {
             .left-son {
                 height: 40px;
                 line-height: 40px;
                 padding: 0 20px;
                 border-bottom: 1px solid #ddd;
                 border-right: 1px solid #ddd;

                font-size: 14px;
                position: relative;
                z-index: 99;

                 &::after{
                         display: block;
                        content: "";
                        width: 10px;
                        height: 10px;
                        border-right: 1px solid #999;
                        border-top: 1px solid #999;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        position: absolute;
                        right: 20px;
                        top: 15px;
                 }
             }
         }
         .active{
            border-right-color: #fff !important;
            color: orange;
        }
        
     }
</style>
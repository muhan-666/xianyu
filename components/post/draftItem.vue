<template>
    <div class="draft-item">
        <p><i class="el-icon-edit" @click="handleClick"></i>{{data.title === ''? '无标题': data.title }}</p>
        <p>{{data.time}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            data:{
                type: Object,
                default(){return {}}
            }
        },
        methods: {
          handleClick(){
              this.$emit('getPostData', this.data)
          }  
        },
        
    }
</script>

<style lang="less" scoped>
    .draft-item {
        margin: 10px 0;
        font-size: 14px;
        p:nth-child(1){
            font-size: 16px;
        }
        p:nth-child(2){
            color: #666;
        }
        .el-icon-edit {
            cursor: pointer;
            font-size: 20px;
            &:hover {
                color: orange;
            }
        }
    }
</style>
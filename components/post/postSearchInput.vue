<template>
  <input type="text" :placeholder="placeholder">
</template>

<script>
export default {
    props:{
        placeholder:{
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
input{
    width: 100%;
    height: 40px;
    padding-right: 15px;
    border: none;
    outline: none;
    background: none;
}
</style>
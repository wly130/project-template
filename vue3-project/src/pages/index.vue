<script setup>
import that from "../utils/utils.js";

var { proxy } = that.getCurrentInstance();

let obj = that.reactive({});
let str = that.ref('');
//获取数据
let getInfo = (e) => {
    let params = {
        key: value
    };
    proxy.$api.getInfo(params).then(res => {

    });
}
</script>

<template>
    <div id="app">
        <button @click="getInfo()"></button>
    </div>
</template>

<style scoped>
#app {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 10rem;
}
</style>

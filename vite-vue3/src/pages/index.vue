<script setup>
import {getCurrentInstance, ref} from "vue";
import Index from "../components/index.vue";

let {proxy} = getCurrentInstance();

let info = ref({});
let key = ref(0);
//获取数据
const getInfo = (value) => {
    let params = {key: value};
    proxy.$api.getInfo(params).then(res => {
        if (res.code !== 200) return;
        info.value = res.data;
    });
}
const keyChange = (value) => key.value = value;
</script>

<template>
    <div id="app">
        <button @click="getInfo">获取数据</button>
        {{ info }}
        <Index :key="key" @keyChange="keyChange"/>
    </div>
</template>

<style scoped>
#app {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 10rem;
}
</style>

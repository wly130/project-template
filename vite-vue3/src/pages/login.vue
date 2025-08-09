<script setup>
import {getCurrentInstance, reactive} from "vue";

let {proxy} = getCurrentInstance();

let info = reactive({username: "", password: ""});

const submitChange = () => {
    if (!(!!info.username) || !(!!info.password)) return;
    proxy.$api.login(info).then(res => {
        if (res.code !== 200) return;
        info.value = res.data;
    });
}
</script>

<template>
    <div id="app">
        <input v-model="info.username" type="text">
        <input v-model="info.password" type="password">
        <button @click="submitChange">确认</button>
    </div>
</template>

<style scoped>
</style>
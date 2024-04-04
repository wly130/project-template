<script setup>
</script>

<template>
    <router-view #default="{ Component, route }">
        <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="route.name"/>
        </keep-alive>
        <div id="app">
            <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name"/>
        </div>
    </router-view>
</template>

<style>
body,
html {
    height: 100%;
}

* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}
</style>

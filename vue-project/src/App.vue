<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
    };
</script>

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

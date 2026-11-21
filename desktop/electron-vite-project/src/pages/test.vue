<script setup lang="ts">
import {ref} from 'vue';

const result = ref('');

async function listItems() {
    try {
        result.value = JSON.stringify(await window.items.list());
    } catch (error) {
        result.value = String(error);
    }
}
</script>

<template>
    <main>
        <h1>测试页</h1>
        <button type="button" @click="listItems">读取记录</button>
        <output>{{ result }}</output>
        <p><RouterLink to="/">返回首页</RouterLink></p>
    </main>
</template>

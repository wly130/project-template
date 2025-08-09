<script setup>
import {defineEmits, defineProps, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";

let {proxy} = getCurrentInstance();
const router = useRouter();

let props = defineProps({
    key: {
        type: Number,
        default: true
    }
});
let emit = defineEmits(["keyChange"]);

defineExpose({});
</script>

<template>
    <div id="app">
        {{ props.key }}
    </div>
</template>

<style scoped></style>
<script setup>
import {defineEmits, defineProps, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";

let {proxy} = getCurrentInstance();
const router = useRouter();

let props = defineProps({
    itemKey: {
        type: Number,
        default: 0
    }
});
let emit = defineEmits(["keyChange"]);

defineExpose({});
</script>

<template>
    <div id="app">
        {{ props.itemKey }}
    </div>
</template>

<style scoped></style>
<script setup>
import that from "../utils/utils.js";
import {useRouter} from "vue-router";

let {proxy} = that.getCurrentInstance();
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
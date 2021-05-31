<template>
    <div class="example">{{ msg }}<smile></smile></div>
</template>

<script>
import smile from './smile.vue'
export default {
    data () {
        return {
            msg: 'Hello world!'
        }
    },
    components: {
        smile
    }
}
</script>

<style>
.example {
  color: red;
}
</style>

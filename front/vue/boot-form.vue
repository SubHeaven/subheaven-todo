<template>
    <form>
        <slot></slot>
    </form>
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
        'smile': smile
    }
}
</script>

<style>
</style>

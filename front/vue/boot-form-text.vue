<template>
    <div class="col col-md-6">
        <label for="name" class="form-label">{{label}}</label>
        <input type="email" class="form-control" id="name" name="name" placeholder="placeholder">
    </div>
</template>

<script>
import smile from './smile.vue'
export default {
    data () {
        return {
            msg: 'Hello world!'
        }
    },
    props: {
        name: String,
        label: String,
        placeholder: String
    },
    components: {
        'smile': smile
    }
}
</script>

<style>
</style>

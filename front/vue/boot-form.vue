<template>
    <form>
        <slot></slot>
        <div class="d-grid gap-3 d-md-flex justify-content-md-end">
            <button class="btn btn-primary col-2" type="button">Cancelar</button>
            <button class="btn btn-primary col-2" type="button">Gravar</button>
        </div>
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

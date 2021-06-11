<template>
    <form class="sub-form">
        <slot></slot>
        <div class="d-grid gap-3 d-md-flex justify-content-md-end sub-form-btn-panel">
            <button class="sub-form-btn btn-cancel col-2" type="button">{{cancelLabel}}</button>
            <button class="sub-form-btn btn-confirm col-2" type="button">{{confirmLabel}} @click="confirm_click"</button>
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
    props: {
        cancelLabel: {
            type: String,
            default: 'Cancelar'
        },
        confirmLabel: {
            type: String,
            default: 'Gravar'
        },
        confirmClick: {
            type: Object,
            default: function () {
                console.log("!!!!!!!!!!!!!!!!!!");
                return { message: 'hello' }
            }
        }
    },
    computed: {
        confirm_click() {
            return this.confirmClick;
        }
    },
    components: {
        'smile': smile
    }
}
</script>

<style>
.sub-form-btn-panel {
    margin-top: 1rem;
}
</style>

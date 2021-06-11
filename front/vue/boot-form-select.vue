<template>
    <div :class="panel_class" style="padding: 0;">
        <div class="row sub-form-input-panel">
            <div class="col col-md-12">
                <label for="select" class="form-label sub-form-input-label">{{label}}</label>
                <select name="select" class="form-select sub-form-input" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        </div>
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
        col: {
            type: Number,
            default: 12
        },
        name: String,
        label: String,
        placeholder: String
    },
    computed: {
        panel_class() {
            return `col col-md-${this.col}`;
        }
    },
    components: {
        'smile': smile
    }
}
</script>

<style>
</style>

<template>
    <div :class="panel_class" style="padding: 0;">
        <div class="row sub-form-input-panel">
            <div class="col col-md-12">
                <label for="name" class="form-label sub-form-input-label">{{label}}</label>
                <input :type="type" class="form-control sub-form-input" :id="name" :name="name" :placeholder="placeholder" v-model="value">
            </div>
        </div>
    </div>
</template>

<script>
import smile from './smile.vue'
export default {
    data () {
        return {
            value: ''
        }
    },
    props: {
        col: {
            type: Number,
            default: 12
        },
        type: {
            type: String,
            default: 'text'
        },
        name: String,
        label: String,
        placeholder: {
            type: String,
            default: ''
        }
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

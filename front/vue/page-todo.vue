<template>
    <main class='container-fluid'>
        <boot-navbar></boot-navbar>
        <main class="container">
            <boot-form>
                <boot-row>
                    <boot-form-text name="nome" label="Tarefa" placeholder="Comprar ovos"></boot-form-text>
                </boot-row>
            </boot-form>
        </main>
    </main>
</template>

<script>
import boot_navbar from './boot-navbar.vue'
import boot_row from './boot-row.vue'
import boot_form from './boot-form.vue'
import boot_text from './boot-form-text.vue'
export default {
    data () {
        return {
            msg: 'Hello world!'
        }
    },
    components: {
        'boot-navbar': boot_navbar,
        'boot-form': boot_form,
        'boot-row': boot_row,
        'boot-form-text': boot_text
    }
}
</script>

<style>
</style>

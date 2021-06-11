<template>
    <main class='container-fluid'>
        <boot-navbar></boot-navbar>
        <main class="container">
            <boot-form>
                <boot-row>
                    <boot-form-text name="nome" label="Tarefa" placeholder="Comprar ovos" col="6"></boot-form-text>
                    <boot-form-select name="prioridade" label="Prioridade" col="6"></boot-form-select>
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
import boot_select from './boot-form-select.vue'
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
        'boot-form-text': boot_text,
        'boot-form-select': boot_select
    }
}
</script>

<style>
</style>

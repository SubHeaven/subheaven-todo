const options = {

    moduleCache: {
        vue: Vue,
    },

    getFile(url) {
        return fetch(url).then(response => response.ok ? response.text() : Promise.reject(response));
    },

    addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },

    log(type, ...args) {
        console.log(type, ...args);
    }
}

const { loadModule, version } = window["vue3-sfc-loader"];

const app = Vue.createApp({
    components: {
        'main-page': Vue.defineAsyncComponent(() => loadModule('../vue/page-todo.vue', options)),
    },
    //template: `Hello <my-component></my-component> <sub>from vue3-sfc-loader v${ version }</sub>`
    template: `<main-page></main-page>`
});

app.mount('#app');
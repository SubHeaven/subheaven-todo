window.customElements.define('hello-world', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Hello World</h1>`;
    }
});
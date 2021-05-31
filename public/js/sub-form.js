// let _template = document.createElement('template');
// _template.innerHTML = `
//         <form class="sub-form">
//             <slot></slot>
//         </form>
//         `;

let _template = document.createElement('template');
_template.innerHTML = `
        <style>.sub-form {
            width: 50vw;
            height: 50vh;
            background-color: #f0f;
        }</style>
        <div class="sub-form">
            <slot></slot>
        </div>
        `;

customElements.define('sub-form', class extends HTMLElement {
    constructor() {
        super();

        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(_template.content.cloneNode(true));
    }
});
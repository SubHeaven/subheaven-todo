if (typeof subheaven === 'undefined') subheaven = {};

subheaven.loadComponent = () => {
    fetch('/js/teste2.html')
        .then(function(response) {
            return response.text();
        })
        .then((html) => {
            // console.log(html);
            const script = document.createElement('div');
            script.innerHTML = html;
            while (script.children.length > 0) {
                let item = script.children[0];
                document.body.appendChild(item);
                if (item.nodeName === 'SCRIPT') {
                    eval(item.innerHTML);
                }
            };
            // document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', html);
        })
}

subheaven.loadComponent();
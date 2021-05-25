const db = require('subheaven-sql');
const log = require('debug')('subheaven:crud');

exports.set = async(url, app, get = null, post = null, put = null, del = null, getOne = null) => {
    if (get) app.get(url, get);
    if (post) app.post(url, post);
    if (put) app.put(url, put);
    if (del) app.delete(url, del);
    if (getOne) app.get(`${url}/:id`, getOne);
}

exports.setCRUD = async(url, app, schema) => {
    let _url = `${url}/${( schema.model ? schema.model : schema.name )}`;
    let get = async(req, res) => {
        try {
            log(`GET ${_url}:`)
            log(`    model: ${schema.name}`);
            dataset = await db.find(schema.name, req.query);
            res.json(dataset);
        } catch (e) {
            console.error(e);
            res.status(501).end();
        }
    }
    let getOne = async(req, res) => {
        try {
            log(`GET ${_url}:`)
            log(`    model: ${schema.name}`);
            dataset = await db.find(schema.name, { id: req.params.id });
            res.json(dataset);
        } catch (e) {
            console.error(e);
            res.status(501).end();
        }
    }
    let post = async(req, res) => {
        try {
            log(`POST ${_url}:`);
            log(`    model: ${schema.name}`);
            let result = await db.insert(schema.name, req.body);
            res.json({ result: result });
        } catch (e) {
            console.error(e);
            res.status(501).end();
        }
    }
    let put = async(req, res) => {
        try {
            log(`PUT ${_url}:`);
            log(`    model: ${schema.name}, id: ${req.body.id}`);
            let result = await db.update(schema.name, { id: req.body.id }, req.body);
            res.json({ result: result });
        } catch (e) {
            console.error(e);
            res.status(501).end();
        }
    }
    let del = async(req, res) => {
        try {
            log(`DELETE ${_url}:`);
            log(`    model: ${schema.name}, id: ${req.body.id}`);
            let result = await db.delete(schema.name, { id: req.body.id });
            res.json({ result: result });
        } catch (e) {
            console.error(e);
            res.status(501).end();
        }
    }
    let _url_plural = `${url}/${schema.name}`;
    this.set(_url_plural, app, get = get);
    this.set(_url, app, get = null, post = post, put = put, del = del, getOne = getOne);
}

exports.setSchemas = async app => {
    this._schemas_base_hateoas = JSON.parse(JSON.stringify(this.schemas));
    await Object.keys(this._schemas_base_hateoas).forEachAsync(async collection => {
        delete this._schemas_base_hateoas[collection].fields;
    });
    this._schemas_base_hateoas.links = [];
    this._schemas_hateoas = {};
    this._schemas_base_hateoas.links.push({
        rel: 'self',
        type: 'GET',
        href: `<base_host>${this.url}`
    });

    await Object.keys(this.schemas).forEachAsync(async collection => {
        this.schemas[collection].name = collection;
        this._schemas_hateoas[collection] = JSON.parse(JSON.stringify(this.schemas[collection]));
        this._schemas_hateoas[collection].links = [{
            rel: 'self',
            type: 'GET',
            href: `<base_host>${this.url}/schema/${collection}`
        }];
        this._schemas_hateoas[collection].links.push({
            rel: 'schemas',
            type: 'GET',
            href: `<base_host>${this.url}`
        });

        this._schemas_base_hateoas.links.push({
            rel: collection,
            type: 'GET',
            href: `<base_host>${this.url}/schema/${collection}`
        });

        this.set(`${this.url}/schema/${collection}`, app, async(req, res) => {
            log(`GET ${this.url}/schema/${collection}`);
            let response_package = JSON.parse(JSON.stringify(this._schemas_hateoas[collection]));
            await response_package.links.forEachAsync(async(link, index) => {
                response_package.links[index].href = response_package.links[index].href.replace('<base_host>', `${req.protocol}://${req.headers.host}`);
            });

            response_package.links.push({
                rel: 'Consultar Todos',
                type: 'GET',
                href: `${req.protocol}://${req.headers.host}${this.url}/${collection}`
            });
            response_package.links.push({
                rel: 'Consultar Pelo ID',
                type: 'GET',
                href: `${req.protocol}://${req.headers.host}${this.url}/${( response_package.model ? response_package.model : collection )}/:Id`
            });
            response_package.links.push({
                rel: 'Inserir',
                type: 'POST',
                href: `${req.protocol}://${req.headers.host}${this.url}/${( response_package.model ? response_package.model : collection )}`
            });
            response_package.links.push({
                rel: 'Editar',
                type: 'PUT',
                href: `${req.protocol}://${req.headers.host}${this.url}/${( response_package.model ? response_package.model : collection )}`
            });
            response_package.links.push({
                rel: 'Excluir',
                type: 'DELETE',
                href: `${req.protocol}://${req.headers.host}${this.url}/${( response_package.model ? response_package.model : collection )}`
            });
            res.json(response_package);
        });

        this.setCRUD(this.url, app, this.schemas[collection]);
    });

    this.set(`${this.url}`, app, async(req, res) => {
        log(`GET ${this.url}`);
        let response_package = JSON.parse(JSON.stringify(this._schemas_base_hateoas));
        await response_package.links.forEachAsync(async(link, index) => {
            response_package.links[index].href = response_package.links[index].href.replace('<base_host>', `${req.protocol}://${req.headers.host}`);
        });
        res.json(response_package);
    });
}

exports.init = async(url, app) => {
    await db.init();
    this.url = url;
    this.schemas = db.schemas;
    await this.setSchemas(app);
}
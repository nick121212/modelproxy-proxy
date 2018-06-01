"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const modelproxy_1 = require("modelproxy");
const modelproxy_engine_fetch_1 = require("modelproxy-engine-fetch");
const log_1 = require("./services/log");
const superagent_1 = require("./services/proxy/engines/superagent");
const container = new inversify_1.Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true
});
exports.container = container;
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.Compose);
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.ModelProxy);
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.BaseEngine);
const proxy = container.resolve(modelproxy_1.ModelProxy);
container.bind("log").toConstantValue(log_1.log).whenTargetTagged("color", false);
container.bind("log").toConstantValue(log_1.colorLog).whenTargetTagged("color", true);
container.bind("mp").toConstantValue(proxy);
container.bind("engines").to(superagent_1.SuperAgentEngine);
const engines = container.getAll("engines");
const fetch = new modelproxy_engine_fetch_1.FetchEngine();
engines.forEach((engine) => {
    proxy.addEngines({
        [engine.engineName]: engine,
        "fetch": fetch
    });
});
fetch.init();
/**
* 请求真正的数据接口
* 判断http的状态码，如果不是200，直接抛出错误
* 判断数据的code字段，如果不是200，抛出错误
* 返回数据
*/
fetch.use((ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    if (ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }
    // 这里需要clone一个fetch，不然多次调用会报错（body stream already read）
    ctx.result = yield ctx.result.clone();
    yield next();
}));
const headerMap = ["content-type", "rediect_url"];
fetch.use((ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.result.headers.forEach((val, name) => {
        if (headerMap.includes(name)) {
            ctx.response.setHeader(name, val);
        }
    });
    ctx.result = yield ctx.result.text();
    yield next();
}));
proxy.loadConfig({
    "key": "tvmaze",
    "title": "p-uc",
    "engine": "fetch",
    "mockDir": "/mocks/",
    "states": {
        "prod": "http://api.tvmaze.com",
        "test": "http://api.tvmaze.com",
        "dev": "http://api.tvmaze.com",
        "stag": "http://api.tvmaze.com"
    },
    "state": "dev",
    "interfaces": [{
            "key": "search.shows",
            "title": "搜索所有的电影数据",
            "method": "GET",
            "path": "/search/shows"
        }]
}, {});
proxy.loadConfig({
    "key": "tvmaze",
    "title": "p-uc",
    "engine": "fetch",
    "mockDir": "/mocks/",
    "states": {
        "prod": "http://api.tvmaze.com",
        "test": "http://api.tvmaze.com",
        "dev": "http://api.tvmaze.com",
        "stag": "http://api.tvmaze.com"
    },
    "state": "dev",
    "interfaces": [{
            "key": "singlesearch.shows",
            "title": "搜索单步电影数据",
            "method": "GET",
            "path": "/singlesearch/shows"
        }]
}, {});
//# sourceMappingURL=container.js.map
import { Container, injectable, decorate } from "inversify";
import { Tracer } from "tracer";
import { ModelProxy, BaseEngine, Compose } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from 'modelproxy/out/models/proxyctx';
import { Response } from 'express';

import { colorLog, log } from "./services/log";
import { SuperAgentEngine } from "./services/proxy/engines/superagent";

const container: Container = new Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true
});

decorate(injectable(), Compose);
decorate(injectable(), ModelProxy);
decorate(injectable(), BaseEngine);

const proxy = container.resolve(ModelProxy);

container.bind<Tracer.Logger>("log").toConstantValue(log).whenTargetTagged("color", false);
container.bind<Tracer.Logger>("log").toConstantValue(colorLog).whenTargetTagged("color", true);
container.bind<ModelProxy>("mp").toConstantValue(proxy);
container.bind<SuperAgentEngine>("engines").to(SuperAgentEngine);

const engines = container.getAll("engines");
const fetch = new FetchEngine<IProxyCtx & { response: Response }>();

engines.forEach((engine: any) => {
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
fetch.use(async (ctx: IProxyCtx, next: (symbol?: string) => Promise<void>) => {
    if (ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }

    // 这里需要clone一个fetch，不然多次调用会报错（body stream already read）
    ctx.result = await ctx.result.clone();

    await next();
});

const headerMap = ["content-type", "rediect_url"];

fetch.use(async (ctx: IProxyCtx & { response: Response }, next: (symbol?: string) => Promise<void>) => {

    ctx.result.headers.forEach((val: string, name: any) => {
        if (headerMap.includes(name)) {
            ctx.response.setHeader(name, val);
        }
    });

    ctx.result = await ctx.result.text();

    await next();
});

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

export { container };
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const path_1 = tslib_1.__importDefault(require("path"));
const routing_controllers_1 = require("routing-controllers");
const container_1 = require("./container");
// import { MPMiddleware } from './middlewares/modelproxy';
const pwd = path_1.default.resolve(__dirname);
/**
 * 载入DI
 */
routing_controllers_1.useContainer(container_1.container);
/**
 * 创建app
 */
const app = routing_controllers_1.createExpressServer({
    cors: true,
    defaultErrorHandler: false,
    defaults: {
        nullResultCode: 404,
        undefinedResultCode: 204,
        paramOptions: {
            required: true
        }
    },
    controllers: [pwd + "/controllers/*.js"],
    middlewares: [pwd + "/middlewares/*.js"],
    interceptors: [pwd + "/interceptors/*.js"],
});
// app.use(MPMiddleware);
// 启动应用
app.listen(3003, "0.0.0.0", () => {
    console.log("server listen on 3003");
});
//# sourceMappingURL=index.js.map
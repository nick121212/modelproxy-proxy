import "reflect-metadata";
import path from "path";
import { Application } from "express";
import { createExpressServer, useContainer } from "routing-controllers";

import { container } from "./container";
// import { MPMiddleware } from './middlewares/modelproxy';

const pwd: string = path.resolve(__dirname);

/**
 * 载入DI
 */
useContainer(container);

/**
 * 创建app
 */
const app: Application = createExpressServer({
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

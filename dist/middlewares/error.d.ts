import { ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Response, Request } from "express";
import { Tracer } from 'tracer';
export declare class ModelProxyMiddleware implements ExpressErrorMiddlewareInterface {
    private $log;
    constructor($log: Tracer.Logger);
    error(error: any, _request: Request, _response: Response, _next?: (err?: any) => any): any;
}

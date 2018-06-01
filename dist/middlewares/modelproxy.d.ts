/// <reference types="express" />
import { ExpressMiddlewareInterface } from "routing-controllers";
import { ModelProxy } from 'modelproxy';
import { Request, Response } from 'express';
export declare class MPMiddleware implements ExpressMiddlewareInterface {
    private $mp;
    constructor($mp: ModelProxy);
    private execute(_request);
    use(_request: Request, _response: Response, _next?: (err?: any) => any): Promise<any>;
}

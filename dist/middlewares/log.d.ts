import { ExpressMiddlewareInterface } from "routing-controllers";
import { Response, Request } from 'express';
import { Tracer } from 'tracer';
export declare class LogMiddleware implements ExpressMiddlewareInterface {
    private $log;
    constructor($log: Tracer.Logger);
    use(request: Request, _response: Response, next?: (err?: any) => any): any;
}

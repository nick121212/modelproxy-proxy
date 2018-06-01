
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Response, Request } from "express";
import { injectable, inject, tagged } from "inversify";
import { Tracer } from 'tracer';

@injectable()
@Middleware({ type: "after" })
export class ModelProxyMiddleware implements ExpressErrorMiddlewareInterface { // interface implementation is optional

    constructor(@inject("log") @tagged("color", true) private $log: Tracer.Logger) { }

    error(error: any, _request: Request, _response: Response, _next?: (err?: any) => any): any {
        this.$log.error(error);

        if (!_response.headersSent) {
            _response.status(200);
            _response.send({
                code: "404",
                message: error.message
            });
        }

        _response.end();
    }

}
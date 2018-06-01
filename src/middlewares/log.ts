
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Response, Request } from 'express';
import { injectable, inject, tagged } from 'inversify';
import { Tracer } from 'tracer';

@injectable()
@Middleware({ type: "before" })
export class LogMiddleware implements ExpressMiddlewareInterface { // interface implementation is optional

    constructor(@inject("log") @tagged("color", true) private $log: Tracer.Logger) {

    }

    public use(request: Request, _response: Response, next?: (err?: any) => any): any {
        this.$log.warn("------------------------------");
        this.$log.log(request.url);
        this.$log.log(request.params);
        this.$log.log(request.body);
        this.$log.log(request.query);
        this.$log.log(request.rawHeaders.join(","));

        if (next) {
            next();
        }
    }

}
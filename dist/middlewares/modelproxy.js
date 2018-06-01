"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const modelproxy_1 = require("modelproxy");
let MPMiddleware = class MPMiddleware {
    constructor($mp) {
        this.$mp = $mp;
    }
    execute(_request) {
        console.log(_request.url);
    }
    use(_request, _response, _next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log("do something...");
            // console.log(_response.statusCode);
            // if (!_response.headersSent) {
            //     await this.execute(_request);
            //     _response.status(404);
            //     _response.send(new NotFoundError());
            // }
            // _response.end();
            if (_next) {
                _next();
            }
        });
    }
};
MPMiddleware = tslib_1.__decorate([
    inversify_1.injectable(),
    routing_controllers_1.Middleware({ type: "after", priority: -99 }),
    tslib_1.__param(0, inversify_1.inject("mp")),
    tslib_1.__metadata("design:paramtypes", [modelproxy_1.ModelProxy])
], MPMiddleware);
exports.MPMiddleware = MPMiddleware;
//# sourceMappingURL=modelproxy.js.map
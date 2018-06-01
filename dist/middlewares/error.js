"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
let ModelProxyMiddleware = class ModelProxyMiddleware {
    constructor($log) {
        this.$log = $log;
    }
    error(error, _request, _response, _next) {
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
};
ModelProxyMiddleware = tslib_1.__decorate([
    inversify_1.injectable(),
    routing_controllers_1.Middleware({ type: "after" }),
    tslib_1.__param(0, inversify_1.inject("log")), tslib_1.__param(0, inversify_1.tagged("color", true)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ModelProxyMiddleware);
exports.ModelProxyMiddleware = ModelProxyMiddleware;
//# sourceMappingURL=error.js.map
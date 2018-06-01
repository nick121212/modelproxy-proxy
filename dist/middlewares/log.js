"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
let LogMiddleware = class LogMiddleware {
    constructor($log) {
        this.$log = $log;
    }
    use(request, _response, next) {
        // this.$log.warn("------------------------------");
        // this.$log.log(request.url);
        // this.$log.log(request.params);
        // this.$log.log(request.body);
        // this.$log.log(request.query);
        // this.$log.log(request.rawHeaders.join(","));
        if (next) {
            next();
        }
    }
};
LogMiddleware = tslib_1.__decorate([
    inversify_1.injectable(),
    routing_controllers_1.Middleware({ type: "before" }),
    tslib_1.__param(0, inversify_1.inject("log")), tslib_1.__param(0, inversify_1.tagged("color", true)),
    tslib_1.__metadata("design:paramtypes", [Object])
], LogMiddleware);
exports.LogMiddleware = LogMiddleware;
//# sourceMappingURL=log.js.map
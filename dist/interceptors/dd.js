"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
let NameCorrectionInterceptor = class NameCorrectionInterceptor {
    intercept(_action, content) {
        return content;
    }
};
NameCorrectionInterceptor = tslib_1.__decorate([
    routing_controllers_1.Interceptor(),
    inversify_1.injectable()
], NameCorrectionInterceptor);
exports.NameCorrectionInterceptor = NameCorrectionInterceptor;
//# sourceMappingURL=dd.js.map
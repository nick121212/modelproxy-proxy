"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const modelproxy_1 = require("modelproxy");
/**
 * 接口转发路由
 */
let UserController = class UserController {
    constructor($mp) {
        this.$mp = $mp;
    }
    /**
     * 转发接口
     *  先判断ns和key是否存在
     *  然后瓶装参数之后转发接口
     * @param   {string}       ns           接口命名空间
     * @param   {string}       key          接口的Key值
     * @param   {Request}      request      request对象
     * @param   {Response}     _response    response对象
     * @param   {any}          params       参数
     * @param   {any}          data         数据
     * @returns {Promise<any>}
     */
    execute(ns, key, request, _response, params = {}, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nsFactory = this.$mp.getNs(ns);
            let interFace;
            if (!nsFactory) {
                throw new routing_controllers_1.HttpError(404, "没有找到命名空间！");
            }
            interFace = nsFactory.get(key);
            if (!interFace) {
                throw new routing_controllers_1.HttpError(404, "没有找到接口！");
            }
            const { method } = request;
            const options = {
                params,
                data,
                instance: {
                    engine: "fetch"
                },
                settings: {
                    cache: false
                }
            };
            switch (method) {
                case "POST":
                    return yield interFace.post(options, {
                        response: _response,
                        request
                    });
                case "GET":
                    return yield interFace.get(params.id, options, {
                        response: _response,
                        request
                    });
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get("/:ns/:key"),
    routing_controllers_1.Post("/:ns/:key"),
    tslib_1.__param(0, routing_controllers_1.Param("ns")),
    tslib_1.__param(1, routing_controllers_1.Param("key")),
    tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__param(4, routing_controllers_1.QueryParams()),
    tslib_1.__param(5, routing_controllers_1.Body({ required: false })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "execute", null);
UserController = tslib_1.__decorate([
    inversify_1.injectable(),
    routing_controllers_1.Controller("/proxy"),
    tslib_1.__param(0, inversify_1.inject("mp")),
    tslib_1.__metadata("design:paramtypes", [modelproxy_1.ModelProxy])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=proxy.js.map
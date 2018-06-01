"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var routing_controllers_1 = require("routing-controllers");
var inversify_1 = require("inversify");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function () {
        return "This action returns all users";
    };
    UserController.prototype.getOne = function (id) {
        return "This action returns user #" + id;
    };
    UserController.prototype.post = function (_user) {
        return "Saving user...";
    };
    UserController.prototype.put = function (_id, _user) {
        return "Updating a user...";
    };
    UserController.prototype.remove = function (_id) {
        return "Removing user...";
    };
    tslib_1.__decorate([
        routing_controllers_1.Get("/users"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserController.prototype, "getAll", null);
    tslib_1.__decorate([
        routing_controllers_1.Get("/users/:id"),
        tslib_1.__param(0, routing_controllers_1.Param("id")),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserController.prototype, "getOne", null);
    tslib_1.__decorate([
        routing_controllers_1.Post("/users"),
        tslib_1.__param(0, routing_controllers_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserController.prototype, "post", null);
    tslib_1.__decorate([
        routing_controllers_1.Put("/users/:id"),
        tslib_1.__param(0, routing_controllers_1.Param("id")), tslib_1.__param(1, routing_controllers_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserController.prototype, "put", null);
    tslib_1.__decorate([
        routing_controllers_1.Delete("/users/:id"),
        tslib_1.__param(0, routing_controllers_1.Param("id")),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserController.prototype, "remove", null);
    UserController = tslib_1.__decorate([
        inversify_1.injectable(),
        routing_controllers_1.Controller()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.1.js.map
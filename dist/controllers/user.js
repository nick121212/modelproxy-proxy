"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
let UserController = class UserController {
    getAll() {
        return "This action returns all users";
    }
    getOne(id) {
        return "This action returns user #" + id;
    }
    post(_user) {
        return "Saving user...";
    }
    put(_id, _user) {
        return "Updating a user...";
    }
    remove(_id) {
        return "Removing user...";
    }
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
exports.UserController = UserController;
//# sourceMappingURL=user.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let AuthController = class AuthController {
    /**
     * @description 登录测试
     * @param {string} email
     * @param {string} password
     * @return {*}
     */
    login(email, password) {
        return { fName: 'aaa', lName: 'bbb' };
    }
    /**
     * @description 获取用户信息
     * @param {*} user
     * @param {*} reply
     * @return {*}
     */
    getUserAuthenticated(user, reply) {
        if (!user) {
            reply.code(401).send();
            return;
        }
        return user;
    }
    notEmptyString(str) {
        return { str };
    }
    myqarams(arg) {
        return { r: arg.a + arg.b };
    }
    manyTypes(x) {
        if (x === 1) {
            return Promise.resolve("a");
        }
        else
            return Promise.resolve(1);
    }
    manyString(x) {
        return "a";
    }
    queryParams2(arg) {
        return { r: arg.a + arg.b };
    }
    someHeader(a) {
        return { a };
    }
    async setPassword(email, password, rePassword) {
        return {};
    }
    async users() {
        return [{ fName: "saba" }, { fName: "baba" }];
    }
    async addUser(user) {
        return { name: 'aaa', age: 18, action: 'small' };
    }
    getUser(params) {
        return { name: "saba" };
    }
    getUsers2(id) {
        return { name: "saba" };
    }
    login2(email, password) {
        return { name: "saba" };
    }
    saveUser(user) {
        return user;
    }
    saveContact(contact) {
        return contact;
    }
    async getData(query) {
        return Promise.resolve({});
    }
    async getFeature(latitude, longitude) {
        return {
            latitude,
            longitude
        };
    }
    async listFeatures(latitude, longitude) {
        return {
            lo: {
                latitude,
                longitude
            },
            hi: {
                latitude,
                longitude
            }
        };
    }
    async recordRoute(latitude, longitude) {
        return {
            latitude,
            longitude
        };
    }
    async routeChat(latitude, longitude, message) {
        return {
            location: {
                latitude,
                longitude
            },
            message: message
        };
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/login'),
    __param(0, (0, routing_controllers_1.BodyParam)("email")),
    __param(1, (0, routing_controllers_1.BodyParam)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Get)('/getUserAuthenticated'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserAuthenticated", null);
__decorate([
    (0, routing_controllers_1.Post)('/notEmptyString'),
    __param(0, (0, routing_controllers_1.BodyParam)("str")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "notEmptyString", null);
__decorate([
    (0, routing_controllers_1.Get)('/queryParams'),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "myqarams", null);
__decorate([
    (0, routing_controllers_1.Get)('/manyTypes'),
    __param(0, (0, routing_controllers_1.QueryParam)("x")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "manyTypes", null);
__decorate([
    (0, routing_controllers_1.Post)('/manyString'),
    __param(0, (0, routing_controllers_1.BodyParam)("x")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AuthController.prototype, "manyString", null);
__decorate([
    (0, routing_controllers_1.Get)('/queryParams2'),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "queryParams2", null);
__decorate([
    (0, routing_controllers_1.Post)('/someHeader'),
    __param(0, (0, routing_controllers_1.HeaderParam)("a")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "someHeader", null);
__decorate([
    (0, routing_controllers_1.Post)('/setPassword'),
    __param(0, (0, routing_controllers_1.BodyParam)("email")),
    __param(1, (0, routing_controllers_1.BodyParam)("password")),
    __param(2, (0, routing_controllers_1.BodyParam)("rePassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
__decorate([
    (0, routing_controllers_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "users", null);
__decorate([
    (0, routing_controllers_1.Post)('/addUser'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addUser", null);
__decorate([
    (0, routing_controllers_1.Get)("getUser/:id"),
    __param(0, (0, routing_controllers_1.Params)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, routing_controllers_1.Get)("getUsers2/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUsers2", null);
__decorate([
    (0, routing_controllers_1.Post)('/login2'),
    __param(0, (0, routing_controllers_1.BodyParam)("email")),
    __param(1, (0, routing_controllers_1.BodyParam)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login2", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveUser'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "saveUser", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveContact'),
    __param(0, (0, routing_controllers_1.BodyParam)('contact')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "saveContact", null);
__decorate([
    (0, routing_controllers_1.Get)('/getData'),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getData", null);
__decorate([
    (0, routing_controllers_1.Get)('/getFeature'),
    __param(0, (0, routing_controllers_1.QueryParam)('latitude')),
    __param(1, (0, routing_controllers_1.QueryParam)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFeature", null);
__decorate([
    (0, routing_controllers_1.Get)('/listFeatures'),
    __param(0, (0, routing_controllers_1.QueryParam)('latitude')),
    __param(1, (0, routing_controllers_1.QueryParam)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "listFeatures", null);
__decorate([
    (0, routing_controllers_1.Get)('/recordRoute'),
    __param(0, (0, routing_controllers_1.QueryParam)('latitude')),
    __param(1, (0, routing_controllers_1.QueryParam)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recordRoute", null);
__decorate([
    (0, routing_controllers_1.Get)('/routeChat'),
    __param(0, (0, routing_controllers_1.QueryParam)('latitude')),
    __param(1, (0, routing_controllers_1.QueryParam)('longitude')),
    __param(2, (0, routing_controllers_1.QueryParam)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "routeChat", null);
AuthController = __decorate([
    (0, routing_controllers_1.JsonController)("/prodsajfhdjsgduct")
], AuthController);
exports.default = AuthController;

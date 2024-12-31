"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElysiaDriver = void 0;
const routing_controllers_1 = require("routing-controllers");
const utils_1 = require("./utils");

class ElysiaDriver extends routing_controllers_1.BaseDriver {
    constructor(elysia) {
        super();
        this.elysia = elysia;
        this.loadElysia();
    }
    initialize() {
        if (this.cors) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cors = require('@elysia/cors');
            if (this.cors === true) {
                this.elysia.register(cors);
            }
            else {
                this.elysia.register(cors, this.cors);
            }
        }
    }
    registerMiddleware(middleware, options) {
        let middlewareWrapper;
        // console.log('middleware', middleware)
        // 通过hook精准注册
        // @ts-ignore
        if (middleware.instance && middleware.instance.hookName) {
            // @ts-ignore
            return this.elysia.addHook(middleware.instance.hookName, middleware.instance.use);
        }
        // if its an error handler then register it with proper signature in express
        if (middleware.instance.error) {
            // onError hook 内不能调用response.send
            // this.elysia.addHook('onError', (request, response, error, next) => {
            //   // 其他代码
            //   (middleware.instance as elysiaErrorMiddlewareInterface).error(request, response, error, next);
            // })
            this.elysia.setErrorHandler((request, response, error) => {
                // 其他代码
                middleware.instance.error(request, response, error);
            });
            return;
        }
        // if its a regular middleware then register it as express middleware
        else if (middleware.instance.use && middleware.type === 'before') {
            middlewareWrapper = (request, response, next) => {
                try {
                    const useResult = middleware.instance.use(request, response, next);
                    if ((0, utils_1.isPromiseLike)(useResult)) {
                        useResult.catch((error) => {
                            this.handleError(error, undefined, { request, response, next });
                            return error;
                        });
                    }
                }
                catch (error) {
                    this.handleError(error, undefined, { request, response, next });
                }
            };
        }
        else if (middleware.instance.use && middleware.type === 'after') {
            middlewareWrapper = (request, response, payload, next) => {
                try {
                    const useResult = middleware.instance.use(request, response, payload, next);
                    if ((0, utils_1.isPromiseLike)(useResult)) {
                        useResult.catch((error) => {
                            this.handleError(error, undefined, { request, response, next });
                            return error;
                        });
                    }
                }
                catch (error) {
                    this.handleError(error, undefined, { request, response, next });
                }
            };
        }
        if (middlewareWrapper) {
            // Name the function for better debugging
            Object.defineProperty(middlewareWrapper, 'name', {
                value: middleware.instance.constructor.name,
                writable: true,
            });
            // 后置中间件，当成preSerialization hook，前置hook 当成 preHandler hook
            // 注意onsend hook内payload已经是序列化之后的string了
            this.elysia.addHook(middleware.type === 'after' ? 'preSerialization' : 'preHandler', middlewareWrapper);
        }
    }
    registerAction(actionMetadata, executeCallback) {
        // middlewares required for this action
        const defaultMiddlewares = [];
        // user used middlewares
        const uses = [...actionMetadata.controllerMetadata.uses, ...actionMetadata.uses];
        const beforeMiddlewares = this.prepareMiddlewares(uses.filter(use => !use.afterAction));
        const afterMiddlewares = this.prepareMiddlewares(uses.filter(use => use.afterAction));
        // prepare route and route handler function
        const route = routing_controllers_1.ActionMetadata.appendBaseRoute(this.routePrefix, actionMetadata.fullRoute);
        const hasResponseParams = actionMetadata.params.filter((params) => params.type === 'response');
        const originMethodOverride = actionMetadata.methodOverride;
        const routeHandler = function routeHandler(ctx) {
            const obj = { request: ctx, response: ctx, context: ctx, next: () => {} };
            return executeCallback(obj);
        };

        // const opts = {
        //     beforeHandle: [...beforeMiddlewares, ...defaultMiddlewares],
        //     afterHandle: [...afterMiddlewares],
        // };
        // finally register action in express
        this.elysia[actionMetadata.type.toLowerCase()](route, (ctx) => {
          return routeHandler(ctx)
        });
    }
    registerRoutes() {
    }
    handleSuccess(result, action, options) {
        // if the action returned the response object itself, short-circuits
        if (result && result === options.response) {
            options.next && options.next();
            return;
        }
        // transform result if needed
        result = this.transformResult(result, action, options);
        // set http status code
        if (result === undefined && action.undefinedResultCode) {
            if (action.undefinedResultCode instanceof Function) {
                throw new action.undefinedResultCode(options);
            }
            options.response.status(action.undefinedResultCode);
        }
        else if (result === null) {
            if (action.nullResultCode) {
                if (action.nullResultCode instanceof Function) {
                    throw new action.nullResultCode(options);
                }
                options.response.status(action.nullResultCode);
            }
            else {
                options.response.status(204);
            }
        }
        else if (action.successHttpCode) {
            options.response.status(action.successHttpCode);
        }
        // apply http headers
        Object.keys(action.headers).forEach(name => {
            options.response.header(name, action.headers[name]);
        });
        if (action.redirect) {
            // if redirect is set then do it
            if (typeof result === 'string') {
                options.response.redirect(result);
            }
            else {
                options.response.redirect(action.redirect);
            }
            options.next && options.next();
        }
        else if (action.renderedTemplate) {
            // if template is set then render it
            const renderOptions = result && result instanceof Object ? result : {};
            options.response.render(action.renderedTemplate, renderOptions, (err, html) => {
                if (err && action.isJsonTyped) {
                    return options.next && options.next(err);
                }
                else if (err && !action.isJsonTyped) {
                    return options.next && options.next(err);
                }
                else if (html) {
                    options.response.send(html);
                }
                options.next && options.next();
            });
        }
        else if (result === undefined) {
            // throw NotFoundError on undefined response
            if (action.undefinedResultCode) {
                if (action.isJsonTyped) {
                    options.response.json();
                }
                else {
                    options.response.send();
                }
                options.next && options.next();
            }
            else {
                throw new routing_controllers_1.NotFoundError();
            }
        }
        else if (result === null) {
            // send null response
            if (action.isJsonTyped) {
                options.response.json(null);
            }
            else {
                options.response.send(null);
            }
            options.next && options.next();
        }
        else if (result instanceof Buffer) {
            // check if it's binary data (Buffer)
            options.response.send(result, 'binary');
        }
        else if (result instanceof Uint8Array) {
            // check if it's binary data (typed array)
            options.response.send(Buffer.from(result), 'binary');
        }
        else if (result.pipe instanceof Function) {
            result.pipe(options.response);
        }
        else {
            // send regular result
            return result;
        }
    }
    handleError(error, action, options) {
        if (this.isDefaultErrorHandlingEnabled) {
            // apply http headers
            if (action) {
                Object.keys(action.headers).forEach(name => {
                    options.response.set(name, action.headers[name]);
                });
            }
            // set http status
            if (error instanceof routing_controllers_1.HttpError && error.httpCode) {
                options.response.statusCode = error.httpCode;
            }
            else {
                options.response.statusCode = 500;
            }
            // send error content
            if (action && action.isJsonTyped) {
                options.response.send(this.processJsonError(error));
            }
            else {
                options.response.send(this.processTextError(error));
            }
        }
        else {
            if (!options.next) {
                throw error;
            }
            options.next && options.next(error);
        }
    }
    getParamFromRequest(action, param) {
        const request = action.request;
        switch (param.type) {
            case 'body':
                return request.body;
            case 'body-param':
                return request.body[param.name];
            case 'param':
                return request.params[param.name];
            case 'params':
                return request.params;
            case 'session-param':
                return request.session[param.name];
            case 'session':
                return request.session;
            case 'state':
                return request.state;
            case 'query':
                return request.query[param.name];
            case 'queries':
                return request.query;
            case 'header':
                return request.headers[param.name.toLowerCase()];
            case 'headers':
                return request.headers;
            case 'file':
                return request.file;
            case 'files':
                return request.files;
            case 'cookie':
                if (!request.headers.cookie)
                    return;
                return request.headers.cookie;
            case 'cookies':
                if (!request.headers.cookie)
                    return {};
                return request.headers.cookie;
        }
    }
    prepareMiddlewares(uses) {
        const middlewareFunctions = [];
        uses.forEach((use) => {
            if (use.middleware.prototype && use.middleware.prototype.use) {
                // if this is function instance of MiddlewareInterface
                middlewareFunctions.push((request, response, next) => {
                    try {
                        const useResult = (0, routing_controllers_1.getFromContainer)(use.middleware).use(request, response, next);
                        if ((0, utils_1.isPromiseLike)(useResult)) {
                            useResult.catch((error) => {
                                this.handleError(error, undefined, { request, response, next });
                                return error;
                            });
                        }
                        return useResult;
                    }
                    catch (error) {
                        this.handleError(error, undefined, { request, response, next });
                    }
                });
            }
            else if (use.middleware.prototype && use.middleware.prototype.error) {
                // if this is function instance of ErrorMiddlewareInterface
                middlewareFunctions.push(function (error, request, response) {
                    return (0, routing_controllers_1.getFromContainer)(use.middleware).error(request, response, error);
                });
            }
            else {
                middlewareFunctions.push(use.middleware);
            }
        });
        return middlewareFunctions;
    }
    loadElysia() {
        if (require) {
            if (!this.elysia) {
                try {
                    this.elysia = require('elysia')();
                }
                catch (e) {
                    throw new Error('fastify package was not found installed. Try to install it: npm install fastify --save');
                }
            }
        }
        else {
            throw new Error('Cannot load elysia. Try to install all required dependencies.');
        }
    }
    loadMulter() {
        try {
            return require('@elysia/multipart');
        }
        catch (e) {
            throw new Error('@elysia/multipart package was not found installed. Try to install it: npm install @elysia/multipart --save');
        }
    }
}
exports.ElysiaDriver = ElysiaDriver;

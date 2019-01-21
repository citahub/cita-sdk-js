"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxyHandlers_1 = __importDefault(require("./proxyHandlers"));
exports.default = (core) => {
    core.base.sendTransaction = new Proxy(core.base.sendTransaction, proxyHandlers_1.default.sendTransactionHandler);
    core.base.getLogs = new Proxy(core.base.getLogs, proxyHandlers_1.default.getLogsHandler);
    return core;
};

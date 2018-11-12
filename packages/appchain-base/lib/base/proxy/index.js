"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxyHandlers_1 = __importDefault(require("./proxyHandlers"));
exports.default = (appchain) => {
    appchain.base.sendTransaction = new Proxy(appchain.base.sendTransaction, proxyHandlers_1.default.sendTransactionHandler);
    appchain.base.getLogs = new Proxy(appchain.base.getLogs, proxyHandlers_1.default.getLogsHandler);
    return appchain;
};

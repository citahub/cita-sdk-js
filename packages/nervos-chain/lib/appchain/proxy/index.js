"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxyHandlers_1 = __importDefault(require("./proxyHandlers"));
exports.default = (web3) => {
    web3.appchain.sendTransaction = new Proxy(web3.appchain.sendTransaction, proxyHandlers_1.default.sendTransactionHandler);
    web3.appchain.getLogs = new Proxy(web3.appchain.getLogs, proxyHandlers_1.default.getLogsHandler);
    return web3;
};

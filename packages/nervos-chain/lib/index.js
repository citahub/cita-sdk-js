"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const node_1 = __importDefault(require("./systems/node"));
const appchain_1 = __importDefault(require("./appchain"));
const contract_1 = __importDefault(require("./contract"));
const NervosWeb3 = (provider, CustomWeb3 = web3_1.default) => {
    const web3 = new CustomWeb3(provider);
    web3.eth.Contract.prototype._executeMethod = contract_1.default;
    const system = {
        node: new node_1.default(web3)
    };
    const target = Object.assign(appchain_1.default(web3), { system });
    return target;
};
exports.default = NervosWeb3;

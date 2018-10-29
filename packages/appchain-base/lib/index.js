"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const systems_1 = __importDefault(require("./systems"));
const base_1 = __importDefault(require("./base"));
const patchHexToBytes_1 = __importDefault(require("./utils/patchHexToBytes"));
const patchPrivateKeyToAccount_1 = __importDefault(require("./utils/patchPrivateKeyToAccount"));
const NervosWeb3 = (provider, CustomWeb3 = web3_1.default) => {
    const web3 = new CustomWeb3(provider);
    patchHexToBytes_1.default(web3);
    patchPrivateKeyToAccount_1.default(web3);
    const appchainWeb3 = base_1.default(web3);
    const systemWeb3 = systems_1.default(appchainWeb3);
    const target = systemWeb3;
    return target;
};
exports.default = NervosWeb3;

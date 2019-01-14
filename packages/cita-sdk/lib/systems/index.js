"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const abis_1 = __importDefault(require("./abis"));
const systemContracts = [
    'admin',
    'authorization',
    'batchTx',
    'chainManager',
    'emergencyBrake',
    'groupManagement',
    'nodeManager',
    'permissionManagement',
    'priceManager',
    'quotaManager',
    'roleManagement',
    'sysConfig',
    'versionManager'
];
const manageGen = (core, contract) => {
    return new core.base.Contract(abis_1.default[contract], config_1.ReservedAddr[contract]);
};
const system = (web3) => {
    const contracts = {};
    systemContracts.forEach((systemContract) => {
        contracts[systemContract] = manageGen(web3, systemContract);
    });
    return Object.assign(web3, { system: contracts });
};
exports.default = system;

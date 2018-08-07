"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const systemContracts = [
    'admin',
    'authorization',
    'chainManager',
    'groupManagement',
    'nodeManager',
    'permissionManagement',
    'quotaManager'
];
const manageGen = (web3, contract) => {
    const abi = require(`./abis/${contract}.json`);
    return new web3.appchain.Contract(abi, config_1.ReservedAddr[contract]);
};
const system = (web3) => {
    const contracts = {};
    systemContracts.forEach((systemContract) => {
        contracts[systemContract] = manageGen(web3, systemContract);
    });
    return Object.assign(web3, { system: contracts });
};
exports.default = system;

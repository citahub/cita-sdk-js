"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const authorization_1 = __importDefault(require("./authorization"));
const batchTx_1 = __importDefault(require("./batchTx"));
const chainManager_1 = __importDefault(require("./chainManager"));
const emergencyBrake_1 = __importDefault(require("./emergencyBrake"));
const groupManagement_1 = __importDefault(require("./groupManagement"));
const nodeManager_1 = __importDefault(require("./nodeManager"));
const permissionManagement_1 = __importDefault(require("./permissionManagement"));
const priceManager_1 = __importDefault(require("./priceManager"));
const quotaManager_1 = __importDefault(require("./quotaManager"));
const roleManagement_1 = __importDefault(require("./roleManagement"));
const sysConfig_1 = __importDefault(require("./sysConfig"));
const versionManager_1 = __importDefault(require("./versionManager"));
const abis = {
    admin: admin_1.default,
    authorization: authorization_1.default,
    batchTx: batchTx_1.default,
    chainManager: chainManager_1.default,
    emergencyBrake: emergencyBrake_1.default,
    groupManagement: groupManagement_1.default,
    nodeManager: nodeManager_1.default,
    permissionManagement: permissionManagement_1.default,
    priceManager: priceManager_1.default,
    quotaManager: quotaManager_1.default,
    roleManagement: roleManagement_1.default,
    sysConfig: sysConfig_1.default,
    versionManager: versionManager_1.default
};
exports.default = abis;

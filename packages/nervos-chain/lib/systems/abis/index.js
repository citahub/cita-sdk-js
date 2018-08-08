"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const authorization_1 = __importDefault(require("./authorization"));
const chainManager_1 = __importDefault(require("./chainManager"));
const groupManagement_1 = __importDefault(require("./groupManagement"));
const nodeManager_1 = __importDefault(require("./nodeManager"));
const permissionManagement_1 = __importDefault(require("./permissionManagement"));
const quotaManager_1 = __importDefault(require("./quotaManager"));
const abis = {
    admin: admin_1.default,
    authorization: authorization_1.default,
    chainManager: chainManager_1.default,
    groupManagement: groupManagement_1.default,
    nodeManager: nodeManager_1.default,
    permissionManagement: permissionManagement_1.default,
    quotaManager: quotaManager_1.default
};
exports.default = abis;

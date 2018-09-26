"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPrivateKey_1 = __importDefault(require("../../utils/addPrivateKey"));
const parsers_1 = require("../../utils/parsers");
exports.sendTransactionHandler = {
    apply: function (target, thisArg, argumentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            const _tx = argumentsList[0];
            const tx = addPrivateKey_1.default(thisArg.accounts.wallet)(_tx);
            return target(tx);
        });
    }
};
exports.getLogsHandler = {
    apply: function (target, _thisArg, argumentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = argumentsList[0];
            const abi = argumentsList[1];
            return target(filter).then((logs) => {
                if (!abi) {
                    return logs;
                }
                else {
                    try {
                        const decodedLogs = [...logs].map((log) => parsers_1.LogParser(log, abi));
                        return decodedLogs;
                    }
                    catch (e) {
                        console.warn(e.message);
                        return logs;
                    }
                }
            });
        });
    }
};
exports.default = {
    sendTransactionHandler: exports.sendTransactionHandler,
    getLogsHandler: exports.getLogsHandler
};

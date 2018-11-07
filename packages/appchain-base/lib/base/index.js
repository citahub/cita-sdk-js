"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signer_1 = __importStar(require("@appchain/signer"));
const rpc = __importStar(require("./rpc"));
const personal = __importStar(require("./neuron"));
const listener_1 = __importDefault(require("./listener"));
const addPrivateKey_1 = __importDefault(require("../utils/addPrivateKey"));
const contract_1 = __importDefault(require("../contract"));
const proxy_1 = __importDefault(require("./proxy"));
const validators_1 = __importDefault(require("../utils/validators"));
const config_1 = require("../systems/config");
exports.default = (web3) => {
    web3.base = web3.base || {};
    web3.extend({
        property: 'base',
        methods: [
            rpc.peerCount,
            rpc.getMetaData,
            rpc.getAbi,
            rpc.getCode,
            rpc.getBalance,
            rpc.getTransactionReceipt,
            rpc.getAccounts,
            rpc.getBlock,
            rpc.getBlockByHash,
            rpc.getBlockByNumber,
            rpc.getBlockNumber,
            rpc.getBlockTransactionCount,
            rpc.getTransaction,
            rpc.getTransactionCount,
            rpc.getTransactionProof,
            rpc.sendSignedTransaction,
            rpc.signTransaction,
            rpc.sendTransaction,
            rpc.sign,
            rpc.call,
            rpc.newMessageFilter,
            rpc.newBlockFilter,
            rpc.getFilterLogs,
            rpc.getFilterChanges,
            rpc.deleteMessageFilter,
            rpc.getLogs,
            personal.getAccounts,
            personal.newAccount,
            personal.sign,
            personal.ecRecover
        ]
    });
    web3.base.accounts = web3.eth.accounts;
    contract_1.default.setProvider(web3.currentProvider);
    contract_1.default.accounts = web3.base.accounts;
    web3.base.Contract = contract_1.default;
    web3 = listener_1.default(web3);
    web3.base.signer = signer_1.default;
    web3.base.unsigner = signer_1.unsigner;
    web3.base.deploy = (contract, transaction) => __awaiter(this, void 0, void 0, function* () {
        const currentHeight = yield web3.base.getBlockNumber().catch((err) => {
            console.error(err);
        });
        let bytecode = '';
        let paramaters = [];
        let types = [];
        let encodedArgs = '';
        if (typeof contract === 'string') {
            bytecode = contract;
        }
        else if (contract.code) {
            bytecode = contract.code;
            paramaters = contract.args || [];
            types = contract.initTypes || [];
        }
        if (paramaters.length) {
            encodedArgs = web3.eth.abi.encodeParameters(types, paramaters);
        }
        const _tx = Object.assign({ version: 0, value: 0, nonce: Math.round(Math.random() * 10) }, transaction, { data: bytecode.replace(/^0x/, '') + encodedArgs, validUntilBlock: +currentHeight + 88 });
        const tx = addPrivateKey_1.default(web3.eth.accounts.wallet)(_tx);
        const result = yield web3.base.sendTransaction(tx).catch((err) => {
            throw new Error(err);
        });
        if (!result.hash) {
            return new Error('No Transaction Hash Received');
        }
        return web3.listeners.listenToTransactionReceipt(result.hash);
    });
    web3.base._abiAddress = config_1.ReservedAddr.abiAddress.replace(/^0x/, '');
    Object.defineProperty(web3.base, 'abiAddress', {
        get: () => {
            return web3.base._abiAddress;
        },
        set: (newAddr) => {
            if (web3.utils.isAddress(newAddr)) {
                web3.base._abiAddress = newAddr.replace(/^0x/, '');
            }
            else {
                throw new Error('Not valid address');
            }
        }
    });
    web3.base.storeAbi = (contractAddress, abi, options) => __awaiter(this, void 0, void 0, function* () {
        if (!contractAddress) {
            throw new Error('Store ABI needs contract address');
        }
        if (!Array.isArray(abi)) {
            throw new Error('ABI should be Array type');
        }
        const _tx = Object.assign({ version: 0, value: 0, nonce: Math.round(Math.random() * 10) }, options, { to: web3.base.abiAddress });
        const transaction = addPrivateKey_1.default(web3.eth.accounts.wallet)(_tx);
        try {
            const abiBytes = web3.utils
                .utf8ToHex(JSON.stringify(abi))
                .slice(2);
            transaction.data = contractAddress.replace(/^0x/i, '') + abiBytes;
        }
        catch (err) {
            throw new Error(err);
        }
        const txResult = yield web3.base.sendTransaction(transaction);
        const txReceipt = yield web3.listeners.listenToTransactionReceipt(txResult.hash);
        return txReceipt;
    });
    const neuron = {
        sign: web3.base.neuron_sign
    };
    web3.base.personal = neuron;
    Object.assign(web3.utils, validators_1.default);
    return proxy_1.default(web3);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Signature = require('elliptic/lib/elliptic/ec/signature');
const blockchainPb = require('../proto-js/blockchain_pb');
const base64ToBytes = (b64) => Buffer.from(b64, 'base64');
const unsigner = (hexUnverifiedTransaction) => {
    const bytesUnverifiedTransaction = index_1.hex2bytes(hexUnverifiedTransaction);
    const unverifiedTransaction = blockchainPb.UnverifiedTransaction.deserializeBinary(bytesUnverifiedTransaction);
    const transactionPb = unverifiedTransaction.getTransaction();
    const signature = unverifiedTransaction.getSignature();
    const crypto = unverifiedTransaction.getCrypto();
    const transaction = blockchainPb.Transaction.toObject(true, transactionPb);
    transaction.value = base64ToBytes(transaction.value);
    transaction.data = base64ToBytes(transaction.data);
    const sign = new Signature({
        r: index_1.bytes2hex(signature.slice(0, 32)).slice(2),
        s: index_1.bytes2hex(signature.slice(32, 64)).slice(2),
        recoveryParam: signature[64],
    });
    const txMsg = transactionPb.serializeBinary();
    const hashedMsg = index_1.sha3(txMsg).slice(2);
    const msg = new Buffer(hashedMsg.toString(), 'hex');
    const pubPoint = index_1.ec.recoverPubKey(msg, sign, sign.recoveryParam, 'hex');
    const publicKey = pubPoint
        .encode('hex')
        .slice(2)
        .toLowerCase();
    const bytesPubkey = new Buffer(index_1.hex2bytes(publicKey));
    const address = index_1.sha3(bytesPubkey)
        .slice(-40)
        .toLowerCase();
    const hexSig = index_1.bytes2hex(signature).slice(2);
    const result = {
        transaction,
        signature: hexSig,
        crypto,
        sender: { publicKey, address },
    };
    return result;
};
exports.default = unsigner;

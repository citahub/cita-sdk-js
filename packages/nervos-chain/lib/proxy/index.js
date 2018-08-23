"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexToBytesHandler = {
    apply: function (target, _, argumentsList) {
        let hex = argumentsList[0] !== undefined ? argumentsList[0].replace(/^0x/, '') : '';
        hex = hex.length % 2 ? '0' + hex : hex;
        return target('0x' + hex);
    }
};
exports.default = {
    hexToBytesHandler
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        constant: true,
        inputs: [],
        name: 'state',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_state', type: 'bool' }],
        name: 'setState',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

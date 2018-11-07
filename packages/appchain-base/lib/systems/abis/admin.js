"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        constant: false,
        inputs: [{ name: '_account', type: 'address' }],
        name: 'update',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_account', type: 'address' }],
        name: 'isAdmin',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'admin',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ name: '_account', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_account', type: 'address' },
            { indexed: true, name: '_old', type: 'address' },
            { indexed: true, name: '_sender', type: 'address' }
        ],
        name: 'AdminUpdated',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'errorType', type: 'uint8' },
            { indexed: false, name: 'msg', type: 'string' }
        ],
        name: 'ErrorLog',
        type: 'event'
    }
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        constant: true,
        inputs: [],
        name: 'getChainId',
        outputs: [{ name: '', type: 'uint32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getEconomicalModel',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_operator', type: 'string' }],
        name: 'setOperator',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getDelayBlockNumber',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getFeeBackPlatformCheck',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getTokenInfo',
        outputs: [
            { name: 'name', type: 'string' },
            { name: 'symbol', type: 'string' },
            { name: 'avatar', type: 'string' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getQuotaCheck',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_chainName', type: 'string' }],
        name: 'setChainName',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getBlockInterval',
        outputs: [{ name: '', type: 'uint64' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getChainName',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getPermissionCheck',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getWebsite',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getChainOwner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getOperator',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_website', type: 'string' }],
        name: 'setWebsite',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { name: '_delayBlockNumber', type: 'uint256' },
            { name: '_checkPermission', type: 'bool' },
            { name: '_checkQuota', type: 'bool' },
            { name: '_checkFeeBackPlatform', type: 'bool' },
            { name: '_chainOwner', type: 'address' },
            { name: '_chainName', type: 'string' },
            { name: '_chainId', type: 'uint32' },
            { name: '_operator', type: 'string' },
            { name: '_website', type: 'string' },
            { name: '_blockInterval', type: 'uint64' },
            { name: '_economicalModel', type: 'uint8' },
            { name: '_name', type: 'string' },
            { name: '_symbol', type: 'string' },
            { name: '_avatar', type: 'string' }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    }
];

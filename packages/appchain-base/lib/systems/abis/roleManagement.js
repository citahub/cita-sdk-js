"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        constant: false,
        inputs: [
            { name: '_roleid', type: 'address' },
            { name: '_permissions', type: 'address[]' }
        ],
        name: 'addPermissions',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_roleid', type: 'address' },
            { name: '_permissions', type: 'address[]' }
        ],
        name: 'deletePermissions',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_roleId', type: 'address' }],
        name: 'queryAccounts',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_roleid', type: 'address' }],
        name: 'deleteRole',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_name', type: 'bytes32' },
            { name: '_permissions', type: 'address[]' }
        ],
        name: 'newRole',
        outputs: [{ name: 'roleid', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_role', type: 'address' }],
        name: 'queryPermissions',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_account', type: 'address' },
            { name: '_role', type: 'address' }
        ],
        name: 'setRole',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_account', type: 'address' },
            { name: '_role', type: 'address' }
        ],
        name: 'cancelRole',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_account', type: 'address' }],
        name: 'clearRole',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_roleid', type: 'address' },
            { name: '_name', type: 'bytes32' }
        ],
        name: 'updateRoleName',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_account', type: 'address' }],
        name: 'queryRoles',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_account', type: 'address' },
            { indexed: true, name: '_role', type: 'address' }
        ],
        name: 'RoleSetted',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_account', type: 'address' },
            { indexed: true, name: '_role', type: 'address' }
        ],
        name: 'RoleCanceled',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: '_account', type: 'address' }],
        name: 'RoleCleared',
        type: 'event'
    }
];

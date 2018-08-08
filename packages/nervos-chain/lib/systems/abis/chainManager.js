"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        constant: false,
        inputs: [],
        name: 'getChainId',
        outputs: [
            {
                name: '',
                type: 'uint32'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'chainId',
                type: 'uint32'
            },
            {
                name: 'blockNumber',
                type: 'uint64'
            },
            {
                name: 'stateProof',
                type: 'bytes'
            }
        ],
        name: 'verifyState',
        outputs: [
            {
                name: '',
                type: 'address'
            },
            {
                name: '',
                type: 'uint256'
            },
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'chainId',
                type: 'uint32'
            },
            {
                name: 'blockHeader',
                type: 'bytes'
            }
        ],
        name: 'verifyBlockHeader',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'id',
                type: 'uint32'
            }
        ],
        name: 'getAuthorities',
        outputs: [
            {
                name: '',
                type: 'address[]'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'getParentChainId',
        outputs: [
            {
                name: '',
                type: 'uint32'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'id',
                type: 'uint32'
            }
        ],
        name: 'enableSideChain',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'chainId',
                type: 'uint32'
            }
        ],
        name: 'getExpectedBlockNumber',
        outputs: [
            {
                name: '',
                type: 'uint64'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'sideChainId',
                type: 'uint32'
            },
            {
                name: 'addrs',
                type: 'address[]'
            }
        ],
        name: 'newSideChain',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'id',
                type: 'uint32'
            }
        ],
        name: 'disableSideChain',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'uint32'
            }
        ],
        name: 'sideChains',
        outputs: [
            {
                name: 'status',
                type: 'uint8'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: '_pid',
                type: 'uint32'
            },
            {
                name: '_addrs',
                type: 'address[]'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'errorType',
                type: 'uint8'
            },
            {
                indexed: false,
                name: 'msg',
                type: 'string'
            }
        ],
        name: 'ErrorLog',
        type: 'event'
    }
];

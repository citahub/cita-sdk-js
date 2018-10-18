export default [
  {
    constant: true,
    inputs: [
      { name: 'cont', type: 'address' },
      { name: 'func', type: 'bytes4' }
    ],
    name: 'inPermission',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_name', type: 'bytes32' }],
    name: 'updateName',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryInfo',
    outputs: [
      { name: '', type: 'bytes32' },
      { name: '', type: 'address[]' },
      { name: '', type: 'bytes4[]' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_conts', type: 'address[]' },
      { name: '_funcs', type: 'bytes4[]' }
    ],
    name: 'deleteResources',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryName',
    outputs: [{ name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'close',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryResource',
    outputs: [{ name: '', type: 'address[]' }, { name: '', type: 'bytes4[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_conts', type: 'address[]' },
      { name: '_funcs', type: 'bytes4[]' }
    ],
    name: 'addResources',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_name', type: 'bytes32' },
      { name: '_conts', type: 'address[]' },
      { name: '_funcs', type: 'bytes4[]' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_conts', type: 'address[]' },
      { indexed: false, name: '_funcs', type: 'bytes4[]' }
    ],
    name: 'ResourcesAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_conts', type: 'address[]' },
      { indexed: false, name: '_funcs', type: 'bytes4[]' }
    ],
    name: 'ResourcesDeleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_oldName', type: 'bytes32' },
      { indexed: true, name: '_name', type: 'bytes32' }
    ],
    name: 'NameUpdated',
    type: 'event'
  }
]

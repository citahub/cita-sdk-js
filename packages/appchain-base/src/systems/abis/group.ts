export default [
  {
    constant: false,
    inputs: [{ name: '_accounts', type: 'address[]' }],
    name: 'deleteAccounts',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
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
    constant: false,
    inputs: [{ name: '_child', type: 'address' }],
    name: 'addChild',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'inGroup',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryInfo',
    outputs: [{ name: '', type: 'bytes32' }, { name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
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
    name: 'queryParent',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_child', type: 'address' }],
    name: 'deleteChild',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_accounts', type: 'address[]' }],
    name: 'addAccounts',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryChildLength',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryAccounts',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryChild',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: '_parent', type: 'address' },
      { name: '_name', type: 'bytes32' },
      { name: '_accounts', type: 'address[]' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_parent', type: 'address' },
      { indexed: true, name: '_name', type: 'bytes32' },
      { indexed: false, name: '_accounts', type: 'address[]' }
    ],
    name: 'GroupNewed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: '_accounts', type: 'address[]' }],
    name: 'AccountsAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: '_accounts', type: 'address[]' }],
    name: 'AccountsDeleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_oldName', type: 'bytes32' },
      { indexed: true, name: '_newName', type: 'bytes32' }
    ],
    name: 'NameUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: '_child', type: 'address' }],
    name: 'ChildDeleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: '_child', type: 'address' }],
    name: 'ChildAdded',
    type: 'event'
  }
]

export default [
  {
    constant: false,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_target', type: 'address' },
      { name: '_accounts', type: 'address[]' }
    ],
    name: 'addAccounts',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryGroups',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_target', type: 'address' },
      { name: '_name', type: 'bytes32' }
    ],
    name: 'updateGroupName',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_target', type: 'address' }
    ],
    name: 'deleteGroup',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_name', type: 'bytes32' },
      { name: '_accounts', type: 'address[]' }
    ],
    name: 'newGroup',
    outputs: [{ name: 'new_group', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_target', type: 'address' },
      { name: '_accounts', type: 'address[]' }
    ],
    name: 'deleteAccounts',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_origin', type: 'address' },
      { name: '_target', type: 'address' }
    ],
    name: 'checkScope',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: '_group', type: 'address' }],
    name: 'GroupDeleted',
    type: 'event'
  }
]

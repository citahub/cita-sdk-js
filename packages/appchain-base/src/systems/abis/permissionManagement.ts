export default [
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permission', type: 'address' }
    ],
    name: 'setAuthorization',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permission', type: 'address' }
    ],
    name: 'cancelAuthorization',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permissions', type: 'address[]' }
    ],
    name: 'setAuthorizations',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_permission', type: 'address' },
      { name: '_name', type: 'bytes32' }
    ],
    name: 'updatePermissionName',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_permission', type: 'address' },
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
    constant: false,
    inputs: [{ name: '_permission', type: 'address' }],
    name: 'deletePermission',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'clearAuthorization',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permissions', type: 'address[]' }
    ],
    name: 'cancelAuthorizations',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_permission', type: 'address' },
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
    constant: false,
    inputs: [
      { name: '_name', type: 'bytes32' },
      { name: '_conts', type: 'address[]' },
      { name: '_funcs', type: 'bytes4[]' }
    ],
    name: 'newPermission',
    outputs: [{ name: 'id', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: '_permission', type: 'address' }],
    name: 'PermissionDeleted',
    type: 'event'
  }
]

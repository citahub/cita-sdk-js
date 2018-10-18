export default [
  {
    constant: false,
    inputs: [{ name: '_permissions', type: 'address[]' }],
    name: 'addPermissions',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deleteRole',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_permission', type: 'address' }],
    name: 'inPermissions',
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
    name: 'queryName',
    outputs: [{ name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryPermissions',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryRole',
    outputs: [{ name: '', type: 'bytes32' }, { name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'lengthOfPermissions',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_permissions', type: 'address[]' }],
    name: 'deletePermissions',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_name', type: 'bytes32' },
      { name: '_permissions', type: 'address[]' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
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
    inputs: [{ indexed: false, name: '_permissions', type: 'address[]' }],
    name: 'PermissionsAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: '_permissions', type: 'address[]' }],
    name: 'PermissionsDeleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_name', type: 'bytes32' },
      { indexed: false, name: '_permissions', type: 'address[]' }
    ],
    name: 'RoleCreated',
    type: 'event'
  }
]

export default [
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permission', type: 'address' }
    ],
    name: 'cancelAuth',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permission', type: 'address' }
    ],
    name: 'checkPermission',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_permission', type: 'address' }],
    name: 'queryAccounts',
    outputs: [{ name: '_accounts', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_permission', type: 'address' }],
    name: 'clearAuthOfPermission',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'queryPermissions',
    outputs: [{ name: '_permissions', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'clearAuth',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'queryAllAccounts',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_cont', type: 'address' },
      { name: '_func', type: 'bytes4' }
    ],
    name: 'checkResource',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_permission', type: 'address' }
    ],
    name: 'setAuth',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: '_superAdmin', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_account', type: 'address' },
      { indexed: true, name: '_permission', type: 'address' }
    ],
    name: 'AuthSetted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_account', type: 'address' },
      { indexed: true, name: '_permission', type: 'address' }
    ],
    name: 'AuthCanceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: '_account', type: 'address' }],
    name: 'AuthCleared',
    type: 'event'
  }
]

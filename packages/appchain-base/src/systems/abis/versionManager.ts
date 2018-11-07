export default [
  {
    constant: true,
    inputs: [],
    name: 'getVersion',
    outputs: [{ name: '', type: 'uint32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_version', type: 'uint32' }],
    name: 'setVersion',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

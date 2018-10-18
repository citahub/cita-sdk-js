export default [
  {
    constant: true,
    inputs: [],
    name: 'getQuotaPrice',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_quotaPrice', type: 'uint256' }],
    name: 'setQuotaPrice',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

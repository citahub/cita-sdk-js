const fs = require('fs')
const path = require('path')

const sign = require('../lib').default


const txsDir = path.resolve(__dirname, '../cita-sdk-tests/transactions/')
const txs = fs.readdirSync(txsDir).filter(fileName => fileName.endsWith('.json'))

const examples = {}
txs.forEach(tx => {
  examples[tx] = require(path.join(txsDir, tx))
})

txs.forEach(_tx => {
  test(`test with ${_tx}`, () => {
    const {
      tx,
      privateKey,
      signed,
      hasError
    } = examples[_tx]
    tx.quota = tx.quota || '10000'
    if (hasError) {
      expect(() => sign(tx, privateKey)).toThrowError(/\w+/)
    } else {
      const factSigned = sign(tx, privateKey)
      expect(factSigned).toBe(signed)
    }
  })
})

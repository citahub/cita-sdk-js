const Signature = require('elliptic/lib/elliptic/ec/signature')
const blockchainPb = require('../proto-js/blockchain_pb')

import { ec, hex2bytes, bytes2hex, sha3 } from './index'

const base64ToHex = (b64: string) =>
  Buffer.from(b64, 'base64')
    .toString('hex')
    .replace(/^0+/, '')

const unsigner = (hexUnverifiedTransaction: string) => {
  const bytesUnverifiedTransaction = hex2bytes(hexUnverifiedTransaction)
  const unverifiedTransaction = blockchainPb.UnverifiedTransaction.deserializeBinary(bytesUnverifiedTransaction)
  const transactionPb = unverifiedTransaction.getTransaction()
  const signature = unverifiedTransaction.getSignature()
  const transaction = blockchainPb.Transaction.toObject(true, transactionPb)
  // convert base64 data, value to hex
  transaction.value = base64ToHex(transaction.value)
  transaction.data = base64ToHex(transaction.data)

  transaction.value = transaction.value ? '0x' + transaction.value : `0x0`
  transaction.data = transaction.data ? '0x' + transaction.data : transaction.data

  switch (+transaction.version) {
    case 1: {
      transaction.chainId = base64ToHex(transaction.chainIdV1)
      transaction.to = transaction.toV1
      delete transaction.chainIdV1
      delete transaction.toV1
      break
    }
    default: {
      break
    }
  }

  const sign = new Signature({
    r: bytes2hex(signature.slice(0, 32)).slice(2),
    s: bytes2hex(signature.slice(32, 64)).slice(2),
    recoveryParam: signature[64],
  })

  const txMsg = transactionPb.serializeBinary()

  const hashedMsg = sha3(txMsg).slice(2)

  const msg = new Buffer(hashedMsg.toString(), 'hex')

  const pubPoint = ec.recoverPubKey(msg, sign, sign.recoveryParam, 'hex')

  const publicKey = `0x${pubPoint
    .encode('hex')
    .slice(2)
    .toLowerCase()}`

  const bytesPubkey = new Buffer(hex2bytes(publicKey))

  const address = `0x${sha3(bytesPubkey)
    .slice(-40)
    .toLowerCase()}`

  const hexSig = bytes2hex(signature).slice(2)

  const result = {
    transaction,
    signature: hexSig,
    sender: { publicKey, address },
  }

  return result
}

export default unsigner

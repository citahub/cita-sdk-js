const Signature = require('elliptic/lib/elliptic/ec/signature')
const blockchainPb = require('../proto-js/blockchain_pb')

import { ec, hex2bytes, bytes2hex, sha3 } from './index'

const unsigner = (hexUnverifiedTransaction: string) => {
  const bytesUnverifiedTransaction = hex2bytes(hexUnverifiedTransaction)
  const unverifiedTransaction = blockchainPb.UnverifiedTransaction.deserializeBinary(bytesUnverifiedTransaction)
  const transactionPb = unverifiedTransaction.getTransaction()
  const signature = unverifiedTransaction.getSignature()
  const version = transactionPb.getVersion()
  const transaction = {
    version,
    data: bytes2hex(transactionPb.getData()),
    chainId: transactionPb.getChainId(),
    to: transactionPb.getTo(),
    nonce: transactionPb.getNonce(),
    value: +bytes2hex(transactionPb.getValue()),
    quota: transactionPb.getQuota(),
    validUntilBlock: +transactionPb.getValidUntilBlock(),
  }
  switch (+version) {
    case 1: {
      transaction.chainId = '0x' + (+bytes2hex(transactionPb.getChainIdV1())).toString(16)
      transaction.to = bytes2hex(transactionPb.getToV1())
      break
    }
    default: {
    }
  }
  if (transaction.to && !transaction.to.startsWith('0x')) {
    transaction.to = '0x' + transaction.to
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

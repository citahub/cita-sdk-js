require('web3-eth')
const utils = require('web3-utils')
const blockchainPb = require('../proto-js/blockchain_pb')
export const unsigner = require('./unsigner').default

const EC = require('elliptic').ec
export const ec = new EC('secp256k1')
export const sha3 = utils.sha3

export const getNonce = () => {
  return utils.randomHex(5)
}

export const hex2bytes = (num: string) => {
  return utils.hexToBytes(num.startsWith('0x') ? num : '0x' + num)
}

export const bytes2hex = (bytes: Uint8Array) => {
  return utils.bytesToHex(bytes)
}

const signer = (
  {
    privateKey,
    data = '',
    nonce = getNonce(),
    quota,
    validUntilBlock,
    value = '',
    version = 0,
    chainId = 1,
    to = '',
  }: {
    privateKey: string
    data?: string
    nonce: string
    quota: number
    validUntilBlock: string | number
    value: string
    version?: number
    chainId: number
    to?: string
  },
  externalKey?: string,
) => {
  if (!privateKey && !externalKey) {
    console.warn('No private key found')
    return {
      data,
      nonce,
      quota,
      validUntilBlock,
      value,
      version,
      chainId,
      to,
    }
  }
  const tx = new blockchainPb.Transaction()

  if (nonce === undefined) {
    tx.setNonce(getNonce())
  } else {
    tx.setNonce(nonce)
  }

  if (quota > 0) {
    tx.setQuota(quota)
  } else {
    throw new Error('Quota should be set larger than 0')
  }

  if (value) {
    try {
      value = value.replace(/^0x/, '')
      if (value.length % 2) {
        value = '0' + value
      }
      const _value = hex2bytes(value)
      const valueBytes = new Uint8Array(32)
      valueBytes.set(_value, 32 - _value.length)
      tx.setValue(valueBytes)
    } catch (err) {
      throw err
    }
  }

  if (to) {
    tx.setTo(to.replace(/^0x/, ''))
  }

  if (validUntilBlock === undefined) {
    throw new Error('ValidUntilBlock should be set')
  } else {
    tx.setValidUntilBlock(validUntilBlock)
  }

  if (chainId === undefined) {
    throw new Error('Chain Id should be set')
  } else {
    tx.setChainId(chainId)
  }

  try {
    const _data = hex2bytes(data)
    tx.setData(new Uint8Array(_data))
  } catch (err) {
    throw err
  }

  tx.setVersion(version)

  const txMsg = tx.serializeBinary()

  const hashedMsg = sha3(txMsg).slice(2)

  // old style
  var key = ec.keyFromPrivate(
    // privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey,
    (externalKey || privateKey).replace(/^0x/, ''),
    'hex',
  )
  var sign = key.sign(new Buffer(hashedMsg.toString(), 'hex'))
  var sign_r = sign.r.toString(16)
  var sign_s = sign.s.toString(16)
  if (sign_r.length == 63) sign_r = '0' + sign_r
  if (sign_s.length == 63) sign_s = '0' + sign_s
  var signature = sign_r + sign_s
  var sign_buffer = new Buffer(signature, 'hex')
  var sigBytes = new Uint8Array(65)
  sigBytes.set(sign_buffer)
  sigBytes[64] = sign.recoveryParam
  // end

  const unverifiedTx = new blockchainPb.UnverifiedTransaction()
  unverifiedTx.setTransaction(tx)
  unverifiedTx.setCrypto(blockchainPb.Crypto.SECP)
  unverifiedTx.setSignature(sigBytes)

  const serializedUnverifiedTx = unverifiedTx.serializeBinary()

  const hexUnverifiedTx = utils.bytesToHex(serializedUnverifiedTx)
  return hexUnverifiedTx
}
export default signer

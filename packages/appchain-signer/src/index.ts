const EC = require('elliptic').ec
const utils = require('web3-utils')
const blockchainPb = require('../proto-js/blockchain_pb')

const MAX_VALUE = '0x' + 'f'.repeat(32)
export const unsigner = require('./unsigner').default
export const ec = new EC('secp256k1')
export const sha3 = utils.sha3
export const getNonce = () => {
  return utils.randomHex(5)
}
export const hex2bytes = (num: string) => {
  num = num.replace(/^0x/, '')
  num = num.length % 2 ? '0x0' + num : '0x' + num
  return utils.hexToBytes(num)
}
export const bytes2hex = (bytes: Uint8Array) => {
  return utils.bytesToHex(bytes)
}

const signer = (
  {
    from,
    privateKey,
    data = '',
    nonce = getNonce(),
    quota,
    validUntilBlock,
    value = '',
    version = '0',
    chainId = '1',
    to = '',
  }: {
    from: string
    privateKey: string
    data?: string
    nonce: string
    quota: number
    validUntilBlock: string | number
    value: string | number
    version?: string | number
    chainId: string | number
    to?: string
  },
  externalKey?: string,
) => {
  const _privateKey = externalKey || privateKey
  if (!_privateKey) {
    console.warn(`No private key found`)
    return {
      data,
      from,
      nonce,
      quota,
      validUntilBlock,
      value,
      version,
      chainId,
      to,
    }
  }

  // preprocess
  let _to: Uint8Array | string = to.toLowerCase().replace(/^0x/, '')
  let _chainId: Uint8Array | string | number = chainId
  let _version = +version ? `V${version}` : ''
  let _nonce = `${nonce}`
  let _quota = +quota
  switch (_version) {
    case 'V1': {
      // set to
      _to = new Uint8Array(hex2bytes(_to))

      // set chainId
      _chainId = hex2bytes('' + chainId) as Uint8Array
      const chainIdBytes = new Uint8Array(32)
      chainIdBytes.set(_chainId, 32 - _chainId.length)
      _chainId = chainIdBytes
      break
    }
    default: {
      break
    }
  }
  const tx = new blockchainPb.Transaction()

  /**
   * nonce
   * random string with max length of 128, used to prevent repeated transaction
   */
  if (!_nonce) {
    tx.setNonce(getNonce())
  } else if (_nonce.length > 128) {
    throw new Error(`Nonce should be random string with max length of 128`)
  } else {
    tx.setNonce(_nonce)
  }

  /**
   * quota
   * user-defined number, acts as gas limit
   */
  if (isNaN(_quota)) {
    throw new Error('Quota should be set as number')
  } else if (_quota <= 0) {
    throw new Error('Quota should be larger than 0')
  } else {
    tx.setQuota(_quota)
  }

  // tradeoff: now cita will throw error when value not set
  value = typeof value === 'number' ? '0x' + value.toString(16) : value || '0x0'

  if (value.length > MAX_VALUE.length) {
    throw new Error(`Value should not be larger than ${MAX_VALUE}`)
  }
  if (+value < 0) {
    throw new Error(`Value should not be negative`)
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
    if (utils.isAddress(to)) {
      tx[`setTo${_version}`](_to)
    } else {
      throw new Error(`Invalid to address`)
    }
  }

  /**
   * validUntilBlock
   * works as timeout, usually set to be current block number + 88, if the transaction has not been mined after valid until block, it will be reguarded as a failed transaction.
   */
  if (validUntilBlock === undefined || isNaN(+validUntilBlock)) {
    throw new Error(`ValidUntilBlock should be set`)
  } else {
    tx.setValidUntilBlock(+validUntilBlock)
  }

  if (_chainId === undefined) {
    throw new Error(`Chain Id should be set`)
  } else {
    tx[`setChainId${_version}`](_chainId)
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

  if (_privateKey.replace(/^0x/, '').length !== 64 || !utils.isHex(_privateKey)) {
    throw new Error('Invalid Private Key')
  }
  // old school code
  const key = ec.keyFromPrivate(_privateKey.replace(/^0x/, ''), 'hex')
  const sign = key.sign(new Buffer(hashedMsg.toString(), 'hex'), { canonical: true })
  let sign_r = sign.r.toString(16)
  let sign_s = sign.s.toString(16)
  if (sign_r.length == 63) sign_r = '0' + sign_r
  if (sign_s.length == 63) sign_s = '0' + sign_s
  const signature = sign_r + sign_s
  const sign_buffer = new Buffer(signature, 'hex')
  const sigBytes = new Uint8Array(65)
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

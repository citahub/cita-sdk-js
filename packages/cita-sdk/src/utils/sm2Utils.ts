import { bytes2hex, hex2bytes, sm2, sm3 } from '@cryptape/cita-signer/lib'
import { Account } from 'web3/eth/accounts'

export const privateKeyToPublicKeyBySM2 = (privateKey: string): string => {
  const key = privateKey.replace(/^0x/, '')
  return sm2.SM2KeyPair(null, key).pubToString()
}

export const publicKeyToAddressSM2 = (publicKey: string): string => {
  return `0x${bytes2hex(sm3().sum(hex2bytes(publicKey.slice(2))))
    .slice(-40)
    .toLowerCase()}`
}
export function accountSignedBySm2(account: Account) {
  const pubKey = privateKeyToPublicKeyBySM2(account.privateKey)
  account.address = publicKeyToAddressSM2(pubKey)
  return account
}

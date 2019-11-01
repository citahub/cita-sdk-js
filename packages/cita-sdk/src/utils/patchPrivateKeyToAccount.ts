import { CryptoTx } from '@cryptape/cita-signer/lib/enum'

import { accountSignedBySm2 } from './sm2Utils'
export default (web3: any) => {
  web3.eth.accounts.privateKeyToAccount = new Proxy(
    web3.eth.accounts.privateKeyToAccount,
    {
      apply: (target: Function, _thisArg: any, argumentsList: any[]) => {
        let privateKey = argumentsList[0]
        if (privateKey && privateKey.length === 64) {
          privateKey = '0x' + privateKey
        }
        if (argumentsList[1] === CryptoTx.SM2) {
          return accountSignedBySm2(target.call(_thisArg, privateKey));
        }

        return target.call(_thisArg, privateKey)
      }
    }
  )
}


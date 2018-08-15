import { hex2bytes } from '@nervos/signer'

export default (web3: any) => {
  web3.utils.hexToBytes = hex2bytes
}

import Web3 from 'web3'
declare const NervosWeb3: (
  provider:
    | string
    | import('web3/types').WebsocketProvider
    | import('web3/types').HttpProvider
    | import('web3/types').IpcProvider,
  CustomWeb3?: typeof Web3
) => import('./base').EnhancedWeb3 & {
  system: any
}
export default NervosWeb3

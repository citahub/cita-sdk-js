import Web3 = require('web3');
export interface EnhancedWeb3 extends Web3 {
    base?: any;
    listeners?: any;
}
declare const _default: (web3: EnhancedWeb3) => EnhancedWeb3;
export default _default;

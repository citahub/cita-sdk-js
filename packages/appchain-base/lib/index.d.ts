import Web3 = require('web3');
declare const NervosWeb3: (provider: string, CustomWeb3?: typeof Web3) => import("./base").EnhancedWeb3 & {
    system: any;
};
export default NervosWeb3;

import { EnhancedWeb3 } from '../base';
declare const system: (web3: EnhancedWeb3) => EnhancedWeb3 & {
    system: any;
};
export default system;

interface ABI {
    constant?: boolean;
    inputs?: {
        name: string;
        type: string;
        indexed?: boolean;
    }[];
    name?: string;
    outputs?: {
        name: string;
        type: string;
    }[];
    payable?: boolean;
    stateMutability?: string;
    type?: string;
    anonymous?: boolean;
}
declare const abis: {
    [index: string]: ABI[];
};
export default abis;

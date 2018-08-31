export declare const unsigner: any;
export declare const ec: any;
export declare const sha3: any;
export declare const getNonce: () => any;
export declare const hex2bytes: (num: string) => any;
export declare const bytes2hex: (bytes: Uint8Array) => any;
declare const signer: ({ privateKey, data, nonce, quota, validUntilBlock, value, version, chainId, to, }: {
    privateKey: string;
    data?: string | undefined;
    nonce: string;
    quota: number;
    validUntilBlock: string | number;
    value: string;
    version?: number | undefined;
    chainId: number;
    to?: string | undefined;
}, externalKey?: string | undefined) => any;
export default signer;

declare const unsigner: (hexUnverifiedTransaction: string) => {
    transaction: {
        version: any;
        data: any;
        chainId: any;
        to: any;
        nonce: any;
        value: number;
        quota: any;
        validUntilBlock: number;
    };
    signature: any;
    sender: {
        publicKey: string;
        address: string;
    };
};
export default unsigner;

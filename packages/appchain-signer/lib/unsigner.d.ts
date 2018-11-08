declare const unsigner: (hexUnverifiedTransaction: string) => {
    transaction: any;
    signature: any;
    sender: {
        publicKey: string;
        address: string;
    };
};
export default unsigner;

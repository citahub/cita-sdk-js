export declare namespace RPC {
    interface getTransactionResult {
        blockHash: string;
        blockNumber: string;
        content: string;
        hash: string;
        index: string;
    }
}
export declare const outputTransactionFormatter: (rpcTx: RPC.getTransactionResult) => {
    unsignedTransaction: any;
    blockHash: string;
    blockNumber: string;
    content: string;
    hash: string;
    index: string;
};
export declare const outputAbiFormatter: (_abi: string) => any;

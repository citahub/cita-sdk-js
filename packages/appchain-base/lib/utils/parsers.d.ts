export interface Log {
    address: string;
    topics: string[];
    data: string;
    blockHash: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    logIndex: string;
    transactionLogIndex: string;
}
export declare const LogParser: (log: string | Log, abi: any) => string | {
    decodedLogs: any;
    address: string;
    topics: string[];
    data: string;
    blockHash: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    logIndex: string;
    transactionLogIndex: string;
};

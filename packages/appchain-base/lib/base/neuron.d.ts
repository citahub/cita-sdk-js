export declare const getAccounts: {
    name: string;
    call: string;
    params: number;
    outputFormatter: any;
};
export declare const newAccount: {
    name: string;
    call: string;
    params: number;
    inputFormatter: null[];
    outputFormatter: any;
};
export declare const unlockAccount: {
    name: string;
    call: string;
    params: number;
    inputFormatter: any[];
};
export declare const lockAccount: {
    name: string;
    call: string;
    params: number;
    inputFormatter: any[];
};
export declare const sign: {
    name: string;
    call: string;
    params: number;
    inputFormatter: any[];
    transformPayload: (payload: any) => any;
};
export declare const ecRecover: {
    name: string;
    call: string;
    params: number;
    inputFormatter: any[];
};

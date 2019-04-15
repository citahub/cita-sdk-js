declare var EventEmitter: any;
declare class Subscription extends EventEmitter {
    id: any;
    callback: any;
    arguments: any;
    _reconnectIntervalId: any;
    options: any;
    constructor(options: any);
    _extractCallback: (...args: any[]) => any;
    _validateArgs: (...args: any[]) => void;
    _formatInput: (args: any[]) => any;
    _formatOutput: (result: any) => any;
    _toPayload: (args: any[]) => {
        method: any;
        params: any[];
    };
    unsubscribe: (callback?: Function | undefined) => void;
    subscribe: (...args: any[]) => this;
}
export default Subscription;

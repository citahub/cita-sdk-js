"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction = {
    from: '',
    nonce: 999999,
    quota: 1000000,
    chainId: 1,
    version: 0,
    validUntilBlock: 999999,
    value: '0x0'
};
class NodeMange {
    constructor(web3, address = '') {
        this.address = '0xffffffffffffffffffffffffffffffffff020001';
        this.signatures = {
            approveNode: 'dd4c97a0',
            deleteNode: '2d4ede93',
            getStatus: '30ccebb5',
            listNode: '609df32f',
            newNode: 'ddad2ffe',
            status: '645b8b1b'
        };
        this.setAddress = (addr) => {
            this.address = addr;
        };
        this.listNode = () => {
            return this.web3.appchain.call({
                to: this.address,
                data: '0x' + this.signatures.listNode
            });
        };
        this.newNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.newNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.appchain.sendTransaction(tx);
        };
        this.approveNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.approveNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.appchain.sendTransaction(tx);
        };
        this.deleteNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.deleteNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.appchain.sendTransaction(tx);
        };
        this.getStatus = (addr) => {
            const cttAddr = this.signatures.getStatus;
            const encodedParams = this.web3.eth.abi
                .encodeParameter('address', addr)
                .slice(2);
            return this.web3.appchain.call({
                to: this.address,
                data: '0x' + cttAddr + encodedParams
            });
        };
        this.status = (addr) => {
            const cttAddr = this.signatures.status;
            const encodedParams = this.web3.eth.abi
                .encodeParameter('address', addr)
                .slice(2);
            return this.web3.appchain.call({
                to: this.address,
                data: '0x' + cttAddr + encodedParams
            });
        };
        this.web3 = web3;
        this.address = address;
    }
}
exports.default = NodeMange;

// package: 
// file: blockchain.proto

import * as jspb from "google-protobuf";

export class Proof extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  getType(): ProofType;
  setType(value: ProofType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Proof.AsObject;
  static toObject(includeInstance: boolean, msg: Proof): Proof.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Proof, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Proof;
  static deserializeBinaryFromReader(message: Proof, reader: jspb.BinaryReader): Proof;
}

export namespace Proof {
  export type AsObject = {
    content: Uint8Array | string,
    type: ProofType,
  }
}

export class BlockHeader extends jspb.Message {
  getPrevhash(): Uint8Array | string;
  getPrevhash_asU8(): Uint8Array;
  getPrevhash_asB64(): string;
  setPrevhash(value: Uint8Array | string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  getStateRoot(): Uint8Array | string;
  getStateRoot_asU8(): Uint8Array;
  getStateRoot_asB64(): string;
  setStateRoot(value: Uint8Array | string): void;

  getTransactionsRoot(): Uint8Array | string;
  getTransactionsRoot_asU8(): Uint8Array;
  getTransactionsRoot_asB64(): string;
  setTransactionsRoot(value: Uint8Array | string): void;

  getReceiptsRoot(): Uint8Array | string;
  getReceiptsRoot_asU8(): Uint8Array;
  getReceiptsRoot_asB64(): string;
  setReceiptsRoot(value: Uint8Array | string): void;

  getQuotaUsed(): number;
  setQuotaUsed(value: number): void;

  getQuotaLimit(): number;
  setQuotaLimit(value: number): void;

  hasProof(): boolean;
  clearProof(): void;
  getProof(): Proof | undefined;
  setProof(value?: Proof): void;

  getProposer(): Uint8Array | string;
  getProposer_asU8(): Uint8Array;
  getProposer_asB64(): string;
  setProposer(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockHeader.AsObject;
  static toObject(includeInstance: boolean, msg: BlockHeader): BlockHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockHeader;
  static deserializeBinaryFromReader(message: BlockHeader, reader: jspb.BinaryReader): BlockHeader;
}

export namespace BlockHeader {
  export type AsObject = {
    prevhash: Uint8Array | string,
    timestamp: number,
    height: number,
    stateRoot: Uint8Array | string,
    transactionsRoot: Uint8Array | string,
    receiptsRoot: Uint8Array | string,
    quotaUsed: number,
    quotaLimit: number,
    proof?: Proof.AsObject,
    proposer: Uint8Array | string,
  }
}

export class Status extends jspb.Message {
  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    hash: Uint8Array | string,
    height: number,
  }
}

export class AccountGasLimit extends jspb.Message {
  getCommonQuotaLimit(): number;
  setCommonQuotaLimit(value: number): void;

  getSpecificQuotaLimitMap(): jspb.Map<string, number>;
  clearSpecificQuotaLimitMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountGasLimit.AsObject;
  static toObject(includeInstance: boolean, msg: AccountGasLimit): AccountGasLimit.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountGasLimit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountGasLimit;
  static deserializeBinaryFromReader(message: AccountGasLimit, reader: jspb.BinaryReader): AccountGasLimit;
}

export namespace AccountGasLimit {
  export type AsObject = {
    commonQuotaLimit: number,
    specificQuotaLimitMap: Array<[string, number]>,
  }
}

export class RichStatus extends jspb.Message {
  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  getHeight(): number;
  setHeight(value: number): void;

  clearNodesList(): void;
  getNodesList(): Array<Uint8Array | string>;
  getNodesList_asU8(): Array<Uint8Array>;
  getNodesList_asB64(): Array<string>;
  setNodesList(value: Array<Uint8Array | string>): void;
  addNodes(value: Uint8Array | string, index?: number): Uint8Array | string;

  getInterval(): number;
  setInterval(value: number): void;

  getVersion(): number;
  setVersion(value: number): void;

  clearValidatorsList(): void;
  getValidatorsList(): Array<Uint8Array | string>;
  getValidatorsList_asU8(): Array<Uint8Array>;
  getValidatorsList_asB64(): Array<string>;
  setValidatorsList(value: Array<Uint8Array | string>): void;
  addValidators(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RichStatus.AsObject;
  static toObject(includeInstance: boolean, msg: RichStatus): RichStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RichStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RichStatus;
  static deserializeBinaryFromReader(message: RichStatus, reader: jspb.BinaryReader): RichStatus;
}

export namespace RichStatus {
  export type AsObject = {
    hash: Uint8Array | string,
    height: number,
    nodesList: Array<Uint8Array | string>,
    interval: number,
    version: number,
    validatorsList: Array<Uint8Array | string>,
  }
}

export class Transaction extends jspb.Message {
  getTo(): string;
  setTo(value: string): void;

  getNonce(): string;
  setNonce(value: string): void;

  getQuota(): number;
  setQuota(value: number): void;

  getValidUntilBlock(): number;
  setValidUntilBlock(value: number): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  getChainId(): number;
  setChainId(value: number): void;

  getVersion(): number;
  setVersion(value: number): void;

  getToV1(): Uint8Array | string;
  getToV1_asU8(): Uint8Array;
  getToV1_asB64(): string;
  setToV1(value: Uint8Array | string): void;

  getChainIdV1(): Uint8Array | string;
  getChainIdV1_asU8(): Uint8Array;
  getChainIdV1_asB64(): string;
  setChainIdV1(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    to: string,
    nonce: string,
    quota: number,
    validUntilBlock: number,
    data: Uint8Array | string,
    value: Uint8Array | string,
    chainId: number,
    version: number,
    toV1: Uint8Array | string,
    chainIdV1: Uint8Array | string,
  }
}

export class UnverifiedTransaction extends jspb.Message {
  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): Transaction | undefined;
  setTransaction(value?: Transaction): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getCrypto(): Crypto;
  setCrypto(value: Crypto): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnverifiedTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: UnverifiedTransaction): UnverifiedTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnverifiedTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnverifiedTransaction;
  static deserializeBinaryFromReader(message: UnverifiedTransaction, reader: jspb.BinaryReader): UnverifiedTransaction;
}

export namespace UnverifiedTransaction {
  export type AsObject = {
    transaction?: Transaction.AsObject,
    signature: Uint8Array | string,
    crypto: Crypto,
  }
}

export class SignedTransaction extends jspb.Message {
  hasTransactionWithSig(): boolean;
  clearTransactionWithSig(): void;
  getTransactionWithSig(): UnverifiedTransaction | undefined;
  setTransactionWithSig(value?: UnverifiedTransaction): void;

  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): void;

  getSigner(): Uint8Array | string;
  getSigner_asU8(): Uint8Array;
  getSigner_asB64(): string;
  setSigner(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: SignedTransaction): SignedTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignedTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedTransaction;
  static deserializeBinaryFromReader(message: SignedTransaction, reader: jspb.BinaryReader): SignedTransaction;
}

export namespace SignedTransaction {
  export type AsObject = {
    transactionWithSig?: UnverifiedTransaction.AsObject,
    txHash: Uint8Array | string,
    signer: Uint8Array | string,
  }
}

export class BlockBody extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<SignedTransaction>;
  setTransactionsList(value: Array<SignedTransaction>): void;
  addTransactions(value?: SignedTransaction, index?: number): SignedTransaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockBody.AsObject;
  static toObject(includeInstance: boolean, msg: BlockBody): BlockBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockBody;
  static deserializeBinaryFromReader(message: BlockBody, reader: jspb.BinaryReader): BlockBody;
}

export namespace BlockBody {
  export type AsObject = {
    transactionsList: Array<SignedTransaction.AsObject>,
  }
}

export class CompactBlockBody extends jspb.Message {
  clearTxHashesList(): void;
  getTxHashesList(): Array<Uint8Array | string>;
  getTxHashesList_asU8(): Array<Uint8Array>;
  getTxHashesList_asB64(): Array<string>;
  setTxHashesList(value: Array<Uint8Array | string>): void;
  addTxHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompactBlockBody.AsObject;
  static toObject(includeInstance: boolean, msg: CompactBlockBody): CompactBlockBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CompactBlockBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompactBlockBody;
  static deserializeBinaryFromReader(message: CompactBlockBody, reader: jspb.BinaryReader): CompactBlockBody;
}

export namespace CompactBlockBody {
  export type AsObject = {
    txHashesList: Array<Uint8Array | string>,
  }
}

export class Block extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): BlockHeader | undefined;
  setHeader(value?: BlockHeader): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): BlockBody | undefined;
  setBody(value?: BlockBody): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    version: number,
    header?: BlockHeader.AsObject,
    body?: BlockBody.AsObject,
  }
}

export class CompactBlock extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): BlockHeader | undefined;
  setHeader(value?: BlockHeader): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): CompactBlockBody | undefined;
  setBody(value?: CompactBlockBody): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompactBlock.AsObject;
  static toObject(includeInstance: boolean, msg: CompactBlock): CompactBlock.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CompactBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompactBlock;
  static deserializeBinaryFromReader(message: CompactBlock, reader: jspb.BinaryReader): CompactBlock;
}

export namespace CompactBlock {
  export type AsObject = {
    version: number,
    header?: BlockHeader.AsObject,
    body?: CompactBlockBody.AsObject,
  }
}

export class BlockWithProof extends jspb.Message {
  hasBlk(): boolean;
  clearBlk(): void;
  getBlk(): Block | undefined;
  setBlk(value?: Block): void;

  hasProof(): boolean;
  clearProof(): void;
  getProof(): Proof | undefined;
  setProof(value?: Proof): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockWithProof.AsObject;
  static toObject(includeInstance: boolean, msg: BlockWithProof): BlockWithProof.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockWithProof, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockWithProof;
  static deserializeBinaryFromReader(message: BlockWithProof, reader: jspb.BinaryReader): BlockWithProof;
}

export namespace BlockWithProof {
  export type AsObject = {
    blk?: Block.AsObject,
    proof?: Proof.AsObject,
  }
}

export class BlockTxs extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): BlockBody | undefined;
  setBody(value?: BlockBody): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockTxs.AsObject;
  static toObject(includeInstance: boolean, msg: BlockTxs): BlockTxs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockTxs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockTxs;
  static deserializeBinaryFromReader(message: BlockTxs, reader: jspb.BinaryReader): BlockTxs;
}

export namespace BlockTxs {
  export type AsObject = {
    height: number,
    body?: BlockBody.AsObject,
  }
}

export class BlackList extends jspb.Message {
  clearBlackListList(): void;
  getBlackListList(): Array<Uint8Array | string>;
  getBlackListList_asU8(): Array<Uint8Array>;
  getBlackListList_asB64(): Array<string>;
  setBlackListList(value: Array<Uint8Array | string>): void;
  addBlackList(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearClearListList(): void;
  getClearListList(): Array<Uint8Array | string>;
  getClearListList_asU8(): Array<Uint8Array>;
  getClearListList_asB64(): Array<string>;
  setClearListList(value: Array<Uint8Array | string>): void;
  addClearList(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlackList.AsObject;
  static toObject(includeInstance: boolean, msg: BlackList): BlackList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlackList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlackList;
  static deserializeBinaryFromReader(message: BlackList, reader: jspb.BinaryReader): BlackList;
}

export namespace BlackList {
  export type AsObject = {
    blackListList: Array<Uint8Array | string>,
    clearListList: Array<Uint8Array | string>,
  }
}

export class StateSignal extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateSignal.AsObject;
  static toObject(includeInstance: boolean, msg: StateSignal): StateSignal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StateSignal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StateSignal;
  static deserializeBinaryFromReader(message: StateSignal, reader: jspb.BinaryReader): StateSignal;
}

export namespace StateSignal {
  export type AsObject = {
    height: number,
  }
}

export enum ProofType {
  AUTHORITYROUND = 0,
  RAFT = 1,
  BFT = 2,
}

export enum Crypto {
  DEFAULT = 0,
  RESERVED = 1,
}


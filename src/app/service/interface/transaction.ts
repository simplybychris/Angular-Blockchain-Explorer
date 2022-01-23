export interface TransactionInput {
  amount?: number;
  address?: string;
  timestamp?: number;
  signature?: string;
}

export interface TransactionOutput {
  amount?: number;
  address?: string;
}

export interface Transaction {
  id?: string;
  txInput?: TransactionInput;
  txOutputs?: TransactionOutput[];
  confirmations?: number;
}

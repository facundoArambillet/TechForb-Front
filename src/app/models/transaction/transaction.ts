import { Account } from "../account/account";

export interface Transaction {
    idTransaction: number;
    status: string;
    amount: number;
    date: Date;
    senderAccount: Account;
    receiverAccount: Account;
}

import { Account } from "../account/account";

export interface Card {
    idCard: number;
    cardNumber: string;
    balance: number;
    cardHolder: string;
    validUntil: Date;
    account: Account;
}

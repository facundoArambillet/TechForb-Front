import { AccountDTO } from "../account/account-dto";
import { Card } from "../card/card";

export interface TransactionDTO {
    status: string;
    amount: number;
    date: Date;
    card: Card;
    idSenderAccount: number;
    idReceiverAccount: number;
}

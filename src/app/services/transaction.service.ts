import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction/transaction';
import { TransactionDTO } from '../models/transaction/transaction-dto';
import { TransactionDepositWithdrawalDTO } from '../models/transaction/transaction-deposit-withdrawal-dto';
import { AuthService } from './auth.service';
import { TransactionReponseChartDTO } from '../models/transaction/transaction-response-chart-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
  private baseUrl: string =  "http://localhost:8080/techforb/transaction";
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getAllByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${this.baseUrl}/${idAccount}`, {headers});
  }
  public getReceiverTransactionsByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${this.baseUrl}/receiver-transaction/${idAccount}`, {headers});
  }
  public getSenderTransactionsByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${this.baseUrl}/sender-transaction/${idAccount}`, {headers});
  }
  public getTransactionWeek(idAccount: number): Observable<TransactionReponseChartDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionReponseChartDTO[]>(`${this.baseUrl}/week/${idAccount}`, {headers});
  }
  public getLatestTransactions(idAccount: number): Observable<Transaction[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<Transaction[]>(`${this.baseUrl}/latest/${idAccount}`, {headers});
  }
  public getIncomeBalanceByAccount(idAccount: number): Observable<number> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<number>(`${this.baseUrl}/balance-income/${idAccount}`, {headers});
  }
  public getOutflowBalanceByAccount(idAccount: number): Observable<number> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<number>(`${this.baseUrl}/balance-outflow/${idAccount}`, {headers});
  }
  public makeTransaction(transaction: TransactionDTO): Observable<TransactionDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDTO>(`${this.baseUrl}`, transaction, {headers});
  }
  public makeDeposit(transaction: TransactionDepositWithdrawalDTO): Observable<TransactionDepositWithdrawalDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDepositWithdrawalDTO>(`${this.baseUrl}/deposit`, transaction, {headers});
  }
  public makeWithdrawal(transaction: TransactionDepositWithdrawalDTO): Observable<TransactionDepositWithdrawalDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDepositWithdrawalDTO>(`${this.baseUrl}/withdrawal`, transaction, {headers});
  }
}

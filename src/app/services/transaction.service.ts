import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction/transaction';
import { TransactionDTO } from '../models/transaction/transaction-dto';
import { TransactionDepositWithdrawalDTO } from '../models/transaction/transaction-deposit-withdrawal-dto';
import { AuthService } from './auth.service';
import { TransactionReponseChartDTO } from '../models/transaction/transaction-response-chart-dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getAllByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${environment.apiUrl}/${idAccount}`, {headers});
  }
  public getReceiverTransactionsByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${environment.apiUrl}/receiver-transaction/${idAccount}`, {headers});
  }
  public getSenderTransactionsByAccount(idAccount: number): Observable<TransactionDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionDTO[]>(`${environment.apiUrl}/sender-transaction/${idAccount}`, {headers});
  }
  public getTransactionWeek(idAccount: number): Observable<TransactionReponseChartDTO[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<TransactionReponseChartDTO[]>(`${environment.apiUrl}/week/${idAccount}`, {headers});
  }
  public getLatestTransactions(idAccount: number): Observable<Transaction[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<Transaction[]>(`${environment.apiUrl}/latest/${idAccount}`, {headers});
  }
  public getIncomeBalanceByAccount(idAccount: number): Observable<number> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<number>(`${environment.apiUrl}/balance-income/${idAccount}`, {headers});
  }
  public getOutflowBalanceByAccount(idAccount: number): Observable<number> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<number>(`${environment.apiUrl}/balance-outflow/${idAccount}`, {headers});
  }
  public makeTransaction(transaction: TransactionDTO): Observable<TransactionDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDTO>(`${environment.apiUrl}`, transaction, {headers});
  }
  public makeDeposit(transaction: TransactionDepositWithdrawalDTO): Observable<TransactionDepositWithdrawalDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDepositWithdrawalDTO>(`${environment.apiUrl}/deposit`, transaction, {headers});
  }
  public makeWithdrawal(transaction: TransactionDepositWithdrawalDTO): Observable<TransactionDepositWithdrawalDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<TransactionDepositWithdrawalDTO>(`${environment.apiUrl}/withdrawal`, transaction, {headers});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card/card';
import { AuthService } from './auth.service';
import { CardDTO } from '../models/card/card-dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Card[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<Card[]>(`${environment.apiUrl}`, {headers});
  }
  public getById(idCard: number): Observable<Card> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<Card>(`${environment.apiUrl}/${idCard}`, {headers});
  }
  public getByIdAccount(idAccount: number): Observable<CardDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<CardDTO>(`${environment.apiUrl}/byAccount/${idAccount}`, {headers});
  }
  public getByUserDocument(userDocument: number): Observable<CardDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<CardDTO>(`${environment.apiUrl}/byUser/${userDocument}`, {headers})
  }
  public getBalance(idCard: number): Observable<number> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<number>(`${environment.apiUrl}/balance/${idCard}`, {headers});
  }
  public createCard(card: Card): Observable<Card> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<Card>(`${environment.apiUrl}`, card, {headers});
  }
  public deleteCard(idCard: number): Observable<Card> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.delete<Card>(`${environment.apiUrl}/${idCard}`, {headers});
  }
}

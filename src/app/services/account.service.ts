import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { AccountDetailDTO } from '../models/account/account-detail-dto';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getByUser(documentNumber: number): Observable<AccountDetailDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<AccountDetailDTO>(`${environment.apiUrl}/byUser/${documentNumber}`, {headers});
  }

}

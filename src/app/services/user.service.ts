import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user/user-dto';
import { UserLoginDTO } from '../models/user/user-login-dto';
import { User } from '../models/user/user';
import { Token } from '../models/token/token';
import { UserCreateDTO } from '../models/user/user-create-dto';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getById(idUser: number): Observable<UserDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<UserDTO>(`${environment.apiUrl}/${idUser}`, {headers});
  }
  public getByDocumentNumber(documentNumber: number): Observable<UserDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<UserDTO>(`${environment.apiUrl}/document-number/${documentNumber}`, {headers});
  }
  public getByAccount(idAccount: number): Observable<UserDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<UserDTO>(`${environment.apiUrl}/by-account/${idAccount}`, {headers});
  }
  public register(userCreateDTO: UserCreateDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${environment.apiUrl}/register`, userCreateDTO);
  }
  public login(userLogin: UserLoginDTO): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/login`, userLogin);
  }
  public deleteUser(idUser: number): Observable<UserDTO> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.delete<UserDTO>(`${environment.apiUrl}/${idUser}`, {headers});
  }
}

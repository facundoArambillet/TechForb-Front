import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item/menu-item';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService{
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  public getAll(): Observable<MenuItem[]> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.get<MenuItem[]>(`${environment.apiUrl}/menu-item`, {headers});
  }
  public createItem(menuItem: MenuItem): Observable<MenuItem> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};

    return this.http.post<MenuItem>(`${environment.apiUrl}/menu-item`, menuItem, {headers});
  }
  public deleteItem(idItem: number): Observable<MenuItem> {
    const token: string | null = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}`};
    
    return this.http.delete<MenuItem>(`${environment.apiUrl}/menu-item/${idItem}`, {headers});
  }
}

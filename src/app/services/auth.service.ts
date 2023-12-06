import { Injectable } from '@angular/core';
import { Token } from '../models/token/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    let tokenString = localStorage.getItem("Token");
    return tokenString;
  }
  
}

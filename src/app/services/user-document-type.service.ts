import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDocumentType } from '../models/user-document-type/user-document-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDocumentTypeService {
  private baseUrl: string =  "http://localhost:8080/techforb/user-document-type";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<UserDocumentType[]> {
    return this.http.get<UserDocumentType[]>(`${this.baseUrl}`);
  }
  public getById(idType: number): Observable<UserDocumentType> {
    return this.http.get<UserDocumentType>(`${this.baseUrl}/${idType}`);
  }
  public getByType(type: string): Observable<UserDocumentType> {
    return this.http.get<UserDocumentType>(`${this.baseUrl}/type/${type}`)
  }
  public createDocumentType(userDocumentType: UserDocumentType): Observable<UserDocumentType> {
    return this.http.post<UserDocumentType>(`${this.baseUrl}`, userDocumentType);
  }
  public deleteDocumentType(idType: number): Observable<UserDocumentType> {
    return this.http.delete<UserDocumentType>(`${this.baseUrl}/${idType}`);
  }
}

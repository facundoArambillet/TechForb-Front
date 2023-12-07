import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDocumentType } from '../models/user-document-type/user-document-type';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDocumentTypeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<UserDocumentType[]> {
    return this.http.get<UserDocumentType[]>(`${environment.apiUrl}/user-document-type`);
  }
  public getById(idType: number): Observable<UserDocumentType> {
    return this.http.get<UserDocumentType>(`${environment.apiUrl}/user-document-type/${idType}`);
  }
  public getByType(type: string): Observable<UserDocumentType> {
    return this.http.get<UserDocumentType>(`${environment.apiUrl}/user-document-type/type/${type}`)
  }
  public createDocumentType(userDocumentType: UserDocumentType): Observable<UserDocumentType> {
    return this.http.post<UserDocumentType>(`${environment.apiUrl}/user-document-type`, userDocumentType);
  }
  public deleteDocumentType(idType: number): Observable<UserDocumentType> {
    return this.http.delete<UserDocumentType>(`${environment.apiUrl}/user-document-type/${idType}`);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry,throwError } from 'rxjs';
import { IPostList } from '../models/interfaces/datainterface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getPosts():Observable<IPostList[]>{
    return this.http.get<IPostList[]>(`${environment.apiUrl}/posts`)
  }
   handleError(error: HttpErrorResponse){
    return throwError(()=> new Error('Could not reach data'));
  }
}

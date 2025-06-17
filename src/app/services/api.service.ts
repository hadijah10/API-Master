import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry,throwError } from 'rxjs';
import { IPostComment, IPostList } from '../models/interfaces/datainterface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getPosts():Observable<IPostList[]>{
    return this.http.get<IPostList[]>(`${environment.apiUrl}/posts3`).pipe(
      catchError(error => this.handleError(error))
    )
  }
  getSinglePostComments(postId:string | null){
    return this.http.get<IPostComment[]>(`${environment.apiUrl}/posts/${postId}/comments`).pipe(
      catchError(error => this.handleError(error))
    )
  }
  deletePost(postId:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/${postId}`).pipe(
      catchError(error => this.handleError(error))
    )
  }
   handleError(error: any){
    let errormessage = ''
    let errorstatus = ''
    if(error.error instanceof ErrorEvent){
      errormessage = error.message
      errorstatus = error.status
    }
    else{

    }
    return throwError(()=> new Error(errormessage + errorstatus));
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry,throwError } from 'rxjs';
import { IPostComment, IPostList } from '../models/interfaces/datainterface';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { ErrorhandlingService } from './errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  handleErrorService =inject(ErrorhandlingService)
  private posts = new BehaviorSubject<IPostList[]>([])
  public postSubject$ = this.posts.asObservable()
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<IPostList[]>(`${environment.apiUrl}/posts`).pipe(
      retry(2),
      catchError(error => this.handleErrorService.handleError(error))
    ).subscribe({
      next: (data) => {
        this.posts.next([...data])
      }
    })
  }
  getSinglePostComments(postId:string | null){
    return this.http.get<IPostComment[]>(`${environment.apiUrl}/posts/${postId}/comments`).pipe(
      retry(2),
      catchError(error => this.handleErrorService.handleError(error))
    )
  }
  deletePost(postId:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/${postId}`).pipe(
      retry(2),
      catchError(error => this.handleErrorService.handleError(error))
    )
  }
 
}

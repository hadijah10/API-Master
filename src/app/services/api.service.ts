import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { IPostComment, IPostList } from '../models/interfaces/datainterface';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { ErrorhandlingService } from './errorhandling.service';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  handleErrorService = inject(ErrorhandlingService);
  private posts = new BehaviorSubject<IPostList[] | any[]>([]);
  public postSubject$ = this.posts.asObservable();

  constructor(private http: HttpClient) {
  }

  // post.service.ts
getPosts(page: number, limit: number): Observable<any> {
  const url = `${environment.apiUrl}/posts?_page=${page}&_limit=${limit}`
  return this.http.get<IPostList[]>(url).pipe(
      retry(2),
      catchError((error) => this.handleErrorService.handleError(error))
    ); // get full response to read headers
}

  getSinglePostComments(postId: string | null) {
    return this.http.get<IPostComment[]>(`${environment.apiUrl}/posts/${postId}/comments`)
      .pipe(
        retry(2),
        catchError((error) => this.handleErrorService.handleError(error))
      );
  }
  createpost(newpost:IPostList |any){
    const oldposts = this.posts.getValue()
    console.log('create')
     this.posts.next([newpost,...oldposts])
     console.log(newpost)
     console.log(this.posts.getValue())
  }

  deletePost(postId: number) {
    return this.http
      .delete(`${environment.apiUrl}/posts/${postId}`)
      .pipe(
        retry(2),
        tap(data => {
           const getposts = this.posts.getValue();
          const newpost = getposts.filter((data: IPostList | any) => data.id !== postId);
          this.posts.next(newpost);
        }),
        catchError((error) => this.handleErrorService.handleError(error))
      )
      .subscribe({
        next: (data) => {
          // const getposts = this.posts.getValue();
          // const newpost = getposts.filter((data: IPostList | any) => data.id !== postId);
          // this.posts.next(newpost);
        },
        error:(error)=> {}
      });
  }
  editPost(postId:number, updatedData:any){
    return this.http.put<any>(`${environment.apiUrl}/posts/1`,updatedData).pipe(
       retry(2),
        catchError((error) => this.handleErrorService.handleError(error))
    ).subscribe({
      next:(data) => {
        const getposts = this.posts.getValue().map((fdata:IPostList | any) => fdata.id==postId? data:fdata)
        this.posts.next(getposts)
      }
    })
  }
}

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
  private posts = new BehaviorSubject<IPostList[]>([]);
  public postSubject$ = this.posts.asObservable();

  constructor(private http: HttpClient) {
    console.log('posts = ', this.posts);
   this.getPosts().subscribe({
    next:() => {},
    error:() => {},
    complete:() => {}
   })
  }

  // post.service.ts
// getPosts(page: number, limit: number): Observable<any> {
//   const url = `${environment.apiUrl}/posts?_page=${page}&_limit=${limit}`;
//   return this.http.get(url).pipe(
//       retry(2),
//       tap((data) => this.posts.next(data)),
//       catchError((error) => this.handleErrorService.handleError(error))
//     ); // get full response to read headers
// }


  getPosts(): Observable<IPostList[]> {
    return this.http.get<IPostList[]>(`${environment.apiUrl}/posts`).pipe(
      retry(2),
      tap((data) => this.posts.next(data)),
      catchError((error) => this.handleErrorService.handleError(error))
    );
  }
  getSinglePostComments(postId: string | null) {
    return this.http.get<IPostComment[]>(`${environment.apiUrl}/posts/${postId}/comments`)
      .pipe(
        retry(2),
        catchError((error) => this.handleErrorService.handleError(error))
      );
  }
  createpost(newpost:any){
    const posts = this.posts.getValue()
     this.posts.next([newpost,...posts])
  }

  deletePost(postId: number) {
    return this.http
      .delete(`${environment.apiUrl}/posts/${postId}`)
      .pipe(
        retry(2),
        catchError((error) => this.handleErrorService.handleError(error))
      )
      .subscribe({
        next: (data) => {
          const getposts = this.posts.getValue();
          const newpost = getposts.filter((data) => data.id !== postId);
          console.log(newpost.length);
          this.posts.next(newpost);
        },
      });
  }
  editPost(postId:number, updatedData:any){
    return this.http.put<any>(`${environment.apiUrl}/posts/1`,updatedData).pipe(
       retry(2),
        catchError((error) => this.handleErrorService.handleError(error))
    ).subscribe({
      next:(data) => {
        const getposts = this.posts.getValue().map(fdata => fdata.id==postId? data:fdata)
        this.posts.next(getposts)
      }
    })
  }
}

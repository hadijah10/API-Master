import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostComment, IPostList } from '../../models/interfaces/datainterface';
import { Subscription,tap,retry, catchError, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-singlepost',
  imports: [],
  templateUrl: './singlepost.component.html',
  styleUrl: './singlepost.component.scss'
})
export class SinglepostComponent implements OnInit,OnDestroy{
      route = inject(ActivatedRoute)
      id:string | null = null
      postcomments:IPostComment[] = []
      subscription = new Subscription();

      constructor(private apiservice: ApiService ){
        this.route.paramMap.subscribe((params) => {
          this.id = params.get('id')
        })
      }
      
      ngOnInit(): void {
        this.subscription = this.apiservice.getsinglePostComments(this.id)
        .pipe(
          tap(data => { this.postcomments = data}),
          retry(2),
          catchError((error) => {
            // this.apiservice.handleError(error)
            return throwError(() => new Error('Failed to fecth products.',error));
          })
        ).subscribe({
          next:(data => {}),
          error:(error => {}),
          complete:() => {}
        })
      }
      ngOnDestroy(): void {
        
      }

}

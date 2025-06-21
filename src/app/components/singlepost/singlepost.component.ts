import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostComment, IPostList } from '../../models/interfaces/datainterface';
import { Subscription,tap,retry, catchError, throwError, EMPTY } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-singlepost',
  imports: [LoaderComponent],
  templateUrl: './singlepost.component.html',
  styleUrl: './singlepost.component.scss'
})
export class SinglepostComponent implements OnInit,OnDestroy{
      route = inject(ActivatedRoute)
      id:string | null = null
      postcomments:IPostComment[] = []
      subscription = new Subscription();
      isLoading:boolean = true
      isError =signal(false)
      errorMessage: string = ''
      constructor(private apiservice: ApiService ){
        this.route.paramMap.subscribe((params) => {
          this.id = params.get('id')
        })
      }
      
      ngOnInit(): void {
        this.subscription = this.apiservice.getSinglePostComments(this.id).pipe(
          catchError((error) => {
            this.isError.set(true)
            this.errorMessage = error
            return EMPTY
          })
        ).subscribe({
          next:(data) => {
            this.isLoading = false
            this.isError.set(false)
            this.postcomments = data},
          error:(error) => {
            this.isError.set(true)
            this.isLoading = false
            },
          complete:() => {}
        })
      }

      handleRetry(){
        window.location.reload()
      }

      ngOnDestroy(): void {
        this.subscription.unsubscribe()
      }

}

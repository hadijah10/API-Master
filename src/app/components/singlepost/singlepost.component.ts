import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostComment, IPostList } from '../../models/interfaces/datainterface';
import { Subscription,tap,retry, catchError, throwError } from 'rxjs';
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

      constructor(private apiservice: ApiService ){
        this.route.paramMap.subscribe((params) => {
          this.id = params.get('id')
        })
      }
      
      ngOnInit(): void {
        this.subscription = this.apiservice.getSinglePostComments(this.id).subscribe({
          next:(data) => {
            this.isLoading = false
            this.postcomments = data},
          error:(error) => {
            this.isLoading = false
            console.log(error)},
          complete:() => {}
        })
      }
      ngOnDestroy(): void {
        this.subscription.unsubscribe()
      }

}

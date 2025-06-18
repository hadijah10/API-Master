import { Component, OnDestroy } from '@angular/core';
import { IPostList } from '../../models/interfaces/datainterface';
import { ApiService } from '../../services/api.service';
import { catchError, retry, Subscription, tap} from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-postlist',
  imports: [RouterLink,LoaderComponent],
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.scss'
})
export class PostlistComponent implements OnDestroy{
  postlistdata:IPostList[] | null = null
  isLoading: boolean = true
  subscription = new Subscription()
  
  constructor(private apiservice: ApiService){
    this.apiservice.getPosts()
     this.subscription = this.apiservice.postSubject$.subscribe({
      next:(data) => {
        this.isLoading = false
        this.postlistdata = data},
      error:(error) => {
        this.isLoading = false
        console.log(error)},
      complete:() => {}
    })
  }
  handleDelete(id:number){
    this.apiservice.deletePost(id).subscribe({
      next:(data) => {},
      error:(error) => {}
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}

import { Component } from '@angular/core';
import { IPostList } from '../../models/interfaces/datainterface';
import { ApiService } from '../../services/api.service';
import { retry, tap } from 'rxjs';

@Component({
  selector: 'app-postlist',
  imports: [],
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.scss'
})
export class PostlistComponent {
  postlistdata:IPostList[] | null = null
  
  constructor(private apiservice: ApiService){
     this.apiservice.getPosts().pipe(
      tap(data => this.postlistdata = data ),
      retry(2),
     ).subscribe({
      next:(data) => { },
      error:(err) => {},
      complete:() => {}
    })
  }

}

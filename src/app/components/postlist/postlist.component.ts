import { Component } from '@angular/core';
import { IPostList } from '../../models/interfaces/datainterface';
import { ApiService } from '../../services/api.service';
import { catchError, retry, tap} from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-postlist',
  imports: [RouterLink],
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.scss'
})
export class PostlistComponent {
  postlistdata:IPostList[] | null = null
  
  constructor(private apiservice: ApiService){
     this.apiservice.getPosts().subscribe({
      next:(data) => {
        this.postlistdata = data},
      error:(err) => {console.log(err)},
      complete:() => {}
    })
  }
  handleDelete(id:number){
    this.apiservice.deletePost(id).subscribe({
      next:(data) => {},
      error:(error) => {}
    });
  }

}

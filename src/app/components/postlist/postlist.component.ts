import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPostList } from '../../models/interfaces/datainterface';
import { ApiService } from '../../services/api.service';
import { catchError, retry, Subscription, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { FormGroup,ReactiveFormsModule,FormControl,Validators} from '@angular/forms';
import { EditpostComponent } from '../editpost/editpost.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postlist',
  imports: [RouterLink,ReactiveFormsModule,LoaderComponent,EditpostComponent,CommonModule],
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.scss',
})
export class PostlistComponent implements OnInit {
  postlistdata: IPostList[] | null = null;
  isLoading: boolean = true;
  subscription = new Subscription();
  isEditing:boolean = false
  id:number =0
  token = JSON.parse(localStorage.getItem('authToken') || 'null')
  editpostForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    body : new FormControl('',[Validators.required, Validators.minLength(3)])
  })

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiservice.postSubject$.subscribe({
      next: (data) => {
        this.isLoading = false;
        this.postlistdata = data;
        
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
      complete: () => {},
    });
  }

  handleDelete(id: number) {
    this.apiservice.deletePost(id);
    };
  
    handleEdit(id:number){
     this.isEditing = true
     this.id = id
  }

  handleEditState(data:boolean){
    this.isEditing = data
  }
    

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

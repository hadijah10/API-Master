import { Component, EventEmitter, inject, Output ,Input} from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editpost',
  imports: [ReactiveFormsModule],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.scss'
})
export class EditpostComponent {
  router = inject(Router)
  @Output() isEditState = new EventEmitter<boolean>()
  @Input() id!:number
  apiservice = inject(ApiService)
  editpostForm = new FormGroup(
    {
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    body : new FormControl('',[Validators.required, Validators.minLength(3)])
  }
  )

  handleCancel(){
    this.isEditState.emit(false)
    this.router.navigate([''])
  }

  handleSubmit(){
      let data = {
      userId : 2,
      Id: Date.now(),
      title: this.editpostForm.value.title,
      body: this.editpostForm.value.body
    }
    if(this.editpostForm.valid){
      this.apiservice.editPost(this.id,data)
    this.editpostForm.value.title = ''
    this.editpostForm.value.body= ''
    this.router.navigate([''])
    }
    else{
      alert('Text inputs must be three characters or more')
    } 
  }
}

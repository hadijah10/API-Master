import { Component, EventEmitter, inject, Output ,Input} from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ValidationSentence } from '../../validators/sentence.validator';

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
    title: new FormControl('',[Validators.required, Validators.minLength(3),ValidationSentence]),
    body : new FormControl('',[Validators.required, Validators.minLength(3),ValidationSentence])
  }
  )

  handleCancel(){
    this.isEditState.emit(false)
    this.router.navigate([''])
  }

  handleSubmit(){
      let data = {
      userId : JSON.parse(localStorage.getItem('authToken') || 'null').userId,
      Id: Date.now(),
      title: this.editpostForm.value.title,
      body: this.editpostForm.value.body
    }
    if(this.editpostForm.valid){
    this.apiservice.editPost(this.id,data)
    this.editpostForm.value.title = ''
    this.editpostForm.value.body= ''
    this.isEditState.emit(false)
    }
   
  }
}

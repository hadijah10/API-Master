import { Component ,inject} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ValidationSentence } from '../../validators/sentence.validator';

@Component({
  selector: 'app-createpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.scss'
})
export class CreatepostComponent {
  router = inject(Router)

  createpostForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3),ValidationSentence]),
    body : new FormControl('',[Validators.required, Validators.minLength(3),ValidationSentence])
  })
  constructor(private apiservice: ApiService){}

  handleSubmit(){
    let data = {
      userId : JSON.parse(localStorage.getItem('authToken') || 'null').userId,
      Id: Date.now(),
      title: this.createpostForm.value.title,
      body: this.createpostForm.value.body
    }
    if(this.createpostForm.valid){
      this.apiservice.createpost(data)
    this.createpostForm.value.title = ''
    this.createpostForm.value.body= ''
    this.router.navigate([''])
    }
    else{
      alert('Text inputs must be three characters or more')
    }
  }
}

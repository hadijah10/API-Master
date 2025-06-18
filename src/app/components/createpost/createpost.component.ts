import { Component ,inject} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.scss'
})
export class CreatepostComponent {
  router = inject(Router)

  createpostForm = new FormGroup({
    title: new FormControl(''),
    body : new FormControl('')
  })
  constructor(private apiservice: ApiService){}

  handleSubmit(){
    let data = {
      userId : 2,
      Id: Date.now(),
      title: this.createpostForm.value.title,
      body: this.createpostForm.value.body
    }
    this.apiservice.createpost(data)
    this.createpostForm.value.title = ''
    this.createpostForm.value.body= ''
    this.router.navigate([''])
  }
}

import { Component, inject } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthService)
  route = inject(Router)
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  handleSubmit(){
    if(this.loginForm.valid){
      this.auth.login({...this.loginForm.value,userID:102})
      this.route.navigate([''])
    }
  }
}

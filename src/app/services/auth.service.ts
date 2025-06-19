import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router)
  http=inject(HttpClient)
  constructor() { }

  login(){
    const mockToken = 'mocked-token'
    localStorage.setItem('authToken',mockToken);
    this.router.navigate([''])
  }
  logout(){
    localStorage.removeItem('authToken')
  }
}
